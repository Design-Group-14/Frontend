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
        const response = await fetch("http://localhost:8000/api/posts/");
        const data = await response.json();

        const formattedPosts = data.posts.map((post) => ({
          id: post.id,
          title: post.title || "Untitled Post",
          content: post.content,
          image_url: post.image_url,
          user: post.user,
          latitude: post.latitude,
          longitude: post.longitude,
          location: post.location,
          created_at: post.created_at,
          likes: post.likes || 0,
        }));

        setPosts(formattedPosts);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const displayPosts = activeTab === "friends" ? posts.slice(0, 20) : posts;

  return (
    <div className="w-full flex flex-col items-center">
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

      <div className="w-full max-w-lg flex flex-col items-center">
        {activeTab === "nearby" ? (
          <div className="w-full h-[500px] p-4">
            <MapView posts={posts} />
          </div>
        ) : (
          <>
            {loading ? (
              <div className="w-full text-center py-8">Loading posts...</div>
            ) : error ? (
              <div className="w-full text-center py-8 text-red-500">{error}</div>
            ) : displayPosts.length === 0 ? (
              <div className="w-full text-center py-8">No posts found</div>
            ) : (
              <div className="w-full p-4 space-y-4">
                {displayPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-center mb-2">
                      <Link
                        to={`/profile?email=${encodeURIComponent(post.user)}`}
                        className="text-blue-500 font-medium hover:underline"
                      >
                        {post.user}
                      </Link>
                      <span className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleString()}
                      </span>
                    </div>

                    {/* Only wrap the image + title/content area in a link */}
                    <Link
                      to={`/post/${post.id}`}
                      className="block hover:opacity-80 transition"
                    >
                      <div className="pointer-events-none">
                        <PostCard post={post} previewOnly />
                      </div>
                    </Link>

                    {/* Re-render PostCard to allow button interaction */}
                    <div className="mt-2">
                      <PostCard post={post} interactiveOnly />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostsFeed;