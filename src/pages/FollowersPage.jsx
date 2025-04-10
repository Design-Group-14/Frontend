import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FollowersPage = () => {
  const [activeTab, setActiveTab] = useState("followers"); 
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/me/", { credentials: "include" })
      .then((res) => res.json())
      .then((userData) => {
        const email = userData.email;
        if (!email) return;

        const endpoint =
          activeTab === "followers"
            ? `http://localhost:8000/api/follow/followers/${email}/`
            : `http://localhost:8000/api/follow/following/${email}/`;

        fetch(endpoint)
          .then((res) => res.json())
          .then((data) => setData(data.followers || data.following || []));
      })
      .catch((err) => console.error("Failed to load data:", err));
  }, [activeTab]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Followers/Following</h1>

     
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "followers"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "following"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
      </div>

     
      {data.length === 0 ? (
        <p className="text-center text-gray-500">
          {activeTab === "followers"
            ? "No one is following you yet."
            : "You're not following anyone."}
        </p>
      ) : (
        <ul className="space-y-2">
          {data.map((person, index) => (
            <li
              key={index}
              className="p-3 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{person.name}</p>
                <p className="text-sm text-gray-500">{person.email}</p>
              </div>
              <Link
                to={`/profile/${person.email}`}
                className="text-blue-500 hover:underline"
              >
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowersPage;
