import React from "react";
import PostBox from "../components/PostBox";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center w-full mt-2">
      {/* ✅ PostBox & Buttons at the Very Top */}
      <div className="w-full max-w-lg bg-white shadow-md p-4 fixed top-0 z-10 flex flex-col items-center">
        <PostBox />

        {/* ✅ Buttons Directly Under the PostBox */}
        <div className="flex gap-4 mt-2">
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
        className="fixed bottom-5 right-5 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
