import React, { useEffect, useState } from "react";
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const emailParam = queryParams.get("email");

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    // Check if viewing own profile
    if (!emailParam || (currentUser && emailParam === currentUser.email)) {
      setIsOwnProfile(true);
      const fullUser = {
        email: currentUser.email,
        firstName: localStorage.getItem("firstName") || "User",
        lastName: localStorage.getItem("lastName") || "",
        course: localStorage.getItem("course") || "Not Provided",
        avatar: currentUser.photoURL || null,
      };
      setUser(fullUser);
    } else {
      setIsOwnProfile(false);
      setUser({ email: emailParam, firstName: "", lastName: "", course: "Unknown", avatar: null });
    }

    // Fetch posts
    if (emailParam || (currentUser && currentUser.email)) {
      const targetEmail = emailParam || currentUser.email;
      fetch(`http://localhost:8000/api/user/${targetEmail}/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.posts) {
            setPosts(data.posts);
          } else {
            setPosts([]);
          }
        })
        .catch((err) => {
          console.error("Failed to load user posts", err);
        });
    }
  }, [emailParam]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        await updateProfile(currentUser, { photoURL: imageUrl });
        setUser((prevUser) => ({ ...prevUser, avatar: imageUrl }));
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      try {
        await deleteUser(currentUser);
        localStorage.clear();
        navigate("/register");
      } catch (error) {
        alert("Error deleting account. Please log in again and try.");
      }
    }
  };

  if (!user) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="flex w-full flex-col items-center px-6 mt-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl text-center flex items-center justify-center relative">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center border shadow">
            {profileImage || user.avatar ? (
              <img
                src={profileImage || user.avatar}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-600 text-3xl">👤</span>
            )}
          </div>

          {/* Only show upload button if it's your profile */}
          {isOwnProfile && (
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer border shadow">
              <PlusCircle className="text-blue-500 w-6 h-6" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>

        {isOwnProfile && (
          <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center absolute right-6">
            <Trash2 className="w-5 h-5 mr-1" />
            Delete Profile
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-6">
        <h3 className="text-lg font-semibold text-gray-700">User Details</h3>
        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-700"><strong>Course:</strong> {user.course}</p>
      </div>

      {/* Posts */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {isOwnProfile ? "Posts by You" : `Posts by ${user.email}`}
        </h3>
        {posts.length === 0 ? (
          <p className="text-gray-500 italic">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border rounded-md">
                {post.image_url && (
                  <img src={post.image_url} alt={post.title} className="w-full h-40 object-cover mb-2 rounded-md" />
                )}
                <h4 className="font-bold">{post.title}</h4>
                <p>{post.content}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(post.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
