import React, { useEffect, useState } from "react";

const ProfilePage = ({ handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve stored user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="flex w-full">
      <div className="flex-grow flex flex-col items-center px-6 mt-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl text-center">
          <img
            src={"https://i.pravatar.cc/150"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-600">@{user.firstName.toLowerCase() + user.lastName.toLowerCase()}</p>
          <p className="mt-2 text-gray-700 italic">{user.course}</p>
        </div>

        {/* Additional Info */}
        <div className="w-full max-w-3xl mt-6 space-y-2 text-left">
          <div className="bg-white p-4 rounded-lg shadow">
            <p><span className="font-semibold text-gray-700">Email:</span> {user.email}</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed bottom-5 right-5 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfilePage;
