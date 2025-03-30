import React, { useState } from "react";
import PostBox from "../components/PostBox";
import PostsFeed from "../components/PostsFeed";
import MapView from "../components/MapView";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* Main content container with natural flow */}
      <div className="w-full max-w-lg">
        {/* Header section - now part of the natural document flow */}
        <div className="bg-white shadow-md p-4 flex flex-col items-center sticky top-0 z-10">
          <PostBox />

          <div className="flex gap-4 mt-2 w-full justify-center">
            <button
              className={`px-6 py-2 rounded-lg shadow transition ${
                activeTab === "friends"
                  ? "bg-blue-500 text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("friends")}
            >
              🔥 Posts From Friends
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

        {/* Content area - will move with header when scaling */}
        <div className="pb-16">
          {activeTab === "friends" && <PostsFeed type="friends" />}
          {activeTab === "nearby" && (
            <>
              <PostsFeed type="nearby" />
              <div className="mt-4 h-96 w-full"> {/* Map container */}
                <MapView />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fixed logout button at bottom */}
      <button className="fixed bottom-5 right-5 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;