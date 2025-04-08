// PostsFeed.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "./PostsCard";
import MapView from "./MapView";

const PostsFeed = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/posts/');
        
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const data = await response.json();
        const formattedPosts = data.posts.map(post => ({
          id: post.id,
          title: post.title || 'Untitled Post',
          content: post.content,
          image_url: post.image_url,
          user: post.user,
          created_at: post.created_at
        }));
        
        setPosts(formattedPosts.slice(0, 2)); // Only show 2 friends' posts
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Centered Tab buttons */}
      <div className="flex gap-4 p-4 bg-white border-b w-full max-w-lg justify-center">
        <button
          className={`px-6 py-2 rounded-lg shadow transition ${
            activeTab === "friends"
              ? "bg-blue-500 text-white"
              : "bg-white border hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("friends")}
        >
          🔥 Friends
        </button>
        <button
          className={`px-6 py-2 rounded-lg shadow transition ${
            activeTab === "nearby"
              ? "bg-blue-500 text-white"
              : "bg-white border hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("nearby")}
        >
          📍 Nearby
        </button>
      </div>

      {/* Centered Content area */}
      <div className="w-full max-w-lg flex flex-col items-center">
        {activeTab === "friends" ? (
          <>
            {loading ? (
              <div className="w-full text-center py-8">Loading posts...</div>
            ) : error ? (
              <div className="w-full text-center py-8 text-red-500">{error}</div>
            ) : posts.length === 0 ? (
              <div className="w-full text-center py-8">No posts from friends yet</div>
            ) : (
              <div className="w-full p-4 space-y-4">
                {posts.map((post) => (
                  <Link 
                    key={post.id} 
                    to={`/post/${post.id}`} 
                    className="block hover:opacity-80 transition"
                  >
                    <PostCard post={post} />
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-[500px] p-4"> {/* Fixed height for map */}
            <MapView />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsFeed;