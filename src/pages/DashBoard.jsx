import React, { useState } from "react";
import PostBox from "../components/PostBox";
import PostsFeed from "../components/PostsFeed"; // New component

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(null); // Track which button is clicked

  return (
    <div className="flex flex-col items-center w-full mt-2">
      {/* ✅ PostBox & Buttons at the Top */}
      <div className="w-full max-w-lg bg-white shadow-md p-4 fixed top-0 z-10 flex flex-col items-center">
        <PostBox />

        {/* ✅ Buttons Directly Under the PostBox */}
        <div className="flex gap-4 mt-2">
          <button
            className={`px-6 py-2 rounded-lg shadow transition ${
              activeTab === "friends"
                ? "bg-blue-500 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("friends")}
          >
            🔥 Post From Friends
          </button>
          <button
            className={`px-6 py-2 rounded-lg shadow transition ${
              activeTab === "nearby"
                ? "bg-blue-500 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("nearby")}
          >
            📍 Posts Near You
          </button>
        </div>
      </div>

      {/* ✅ Post Feed Appears Below Buttons */}
      <div className="mt-28 w-full max-w-lg">
        {activeTab === "friends" && <PostsFeed type="friends" />}
        {activeTab === "nearby" && <PostsFeed type="nearby" />}
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
