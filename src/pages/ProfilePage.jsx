import React, { useEffect, useState } from "react";
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser({
        name: `${localStorage.getItem("firstName") || "User"} ${localStorage.getItem("lastName") || ""}`,
        email: currentUser.email,
        course: localStorage.getItem("course") || "Not Provided",
        avatar: currentUser.photoURL || null,
      });
    }
  }, []);

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
        localStorage.removeItem("user");
        localStorage.removeItem("course");
        localStorage.setItem("isAuthenticated", "false");
        navigate("/register");
      } catch (error) {
        alert("Error deleting account. Please log in again and try.");
      }
    }
  };

  if (!user) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="flex w-full flex-col items-center px-6 mt-6">
      {/* User Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl text-center flex items-center justify-center relative">
        {/* Profile Image & Upload Button */}
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

          {/* Upload Button */}
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer border shadow">
            <PlusCircle className="text-blue-500 w-6 h-6" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        {/* Delete Account Button - Moved to Right */}
        <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center absolute right-6">
          <Trash2 className="w-5 h-5 mr-1" />
          Delete Profile
        </button>
      </div>

      {/* User Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-6">
        <h3 className="text-lg font-semibold text-gray-700">User Details</h3>
        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-700"><strong>Course:</strong> {user.course}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
