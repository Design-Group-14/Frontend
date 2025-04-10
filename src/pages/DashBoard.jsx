// Dashboard.jsx
import React from "react";
import PostBox from "../components/PostBox";
import PostsFeed from "../components/PostsFeed";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* Header with PostBox */}
      <div className="bg-white shadow-md p-4 w-full max-w-lg flex flex-col items-center sticky top-0 z-10">
        <PostBox />
      </div>

      {/* Main content - just render PostsFeed */}
      <div className="w-full max-w-lg pb-16">
        <PostsFeed />
      </div>

      {/* Logout button */}
      <button className="fixed bottom-5 right-5 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;