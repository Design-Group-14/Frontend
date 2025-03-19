import React from "react";
import PostBox from "../components/PostBox";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* ✅ Move Post Box to the Top */}
      <div className="fixed top-10 w-full max-w-lg">
        <PostBox />

        {/* ✅ Move Buttons Right Under the Post Box */}
        <div className="flex justify-center gap-4 mt-2">
          <button className="bg-white border px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition">
            🔥 Post From Friends
          </button>
          <button className="bg-white border px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition">
            📍 Posts Near You
          </button>
        </div>
      </div>

      {/* ✅ Log Out Button in Bottom Right */}
      <button
        onClick={handleLogout}
        className="fixed bottom-5 right-5 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
