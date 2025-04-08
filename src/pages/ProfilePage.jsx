import React, { useEffect, useState } from "react";
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOwner, setIsOwner] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!id || (currentUser && id === currentUser.uid)) {
      setIsOwner(true);
      if (!currentUser) {
        setError("No current user found");
        setLoading(false);
        return;
      }
      const name = `${localStorage.getItem("firstName") || "User"} ${localStorage.getItem("lastName") || ""}`;
      const email = currentUser.email;
      const course = localStorage.getItem("course") || "Not Provided";
      const avatar = currentUser.photoURL || null;

      setUser({
        id: currentUser.uid,
        name,
        email,
        course,
        avatar,
      });

      fetch(`http://localhost:8000/api/user/${email}/`)
        .then((res) => res.json())
        .then((data) => setPosts(data.posts || []))
        .catch((err) => console.error("Failed to load posts", err));

      setLoading(false);
    } else {
      setIsOwner(false);

      const fetchOtherUser = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:8000/auth/users/${id}/`);
          if (!response.ok) {
            throw new Error("Failed to fetch user profile");
          }
          const data = await response.json();
          const name = data.username || `${data.first_name} ${data.last_name}`;
          const userProfile = {
            id: data.id,
            name,
            email: data.email,
            course: data.course || "Not Provided",
            avatar: data.photoURL || null,
          };
          setUser(userProfile);

          fetch(`http://localhost:8000/api/user/${data.email}/`)
            .then((res) => res.json())
            .then((data) => setPosts(data.posts || []))
            .catch((err) => console.error("Failed to load posts", err));

          setLoading(false);
        } catch (err) {
          console.error(err);
          setError(err.message);
          setLoading(false);
        }
      };

      fetchOtherUser();
    }
  }, [id]);

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;
  if (!user) return <div className="text-center text-red-500 mt-6">User not found</div>;

  const handleImageUpload = async (event) => {
    if (!isOwner) return;
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await updateProfile(currentUser, { photoURL: imageUrl });
        setUser((prev) => ({ ...prev, avatar: imageUrl }));
      } catch (err) {
        console.error("Error updating profile picture:", err);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (!isOwner) return;
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      try {
        await deleteUser(currentUser);
        localStorage.removeItem("user");
        localStorage.removeItem("course");
        localStorage.setItem("isAuthenticated", "false");
        navigate("/register");
      } catch (err) {
        alert("Error deleting account. Please log in again and try.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-6 mt-6">
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-4 ml-20 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        ← Back
      </button>

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

          {isOwner && (
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer border shadow">
              <PlusCircle className="text-blue-500 w-6 h-6" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {isOwner && (
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center absolute right-6"
          >
            <Trash2 className="w-5 h-5 mr-1" />
            Delete Profile
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-6">
        <h3 className="text-lg font-semibold text-gray-700">User Details</h3>
        <p className="text-gray-700">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700">
          <strong>Course:</strong> {user.course}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {isOwner ? "Posts by You" : `Posts by ${user.email}`}
        </h3>
        {posts.length === 0 ? (
          <p className="text-gray-500 italic">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border rounded-md">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-40 object-cover mb-2 rounded-md"
                  />
                )}
                <h4 className="font-bold">{post.title}</h4>
                <p>{post.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
