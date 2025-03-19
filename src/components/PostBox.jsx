import React, { useState } from "react";

const PostBox = () => {
  const [post, setPost] = useState("");

  const handlePost = () => {
    console.log("Posting:", post);
    setPost(""); // Clear input after posting
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">What's happening?</h2>
      <textarea
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Post
      </button>
    </div>
  );
};

export default PostBox;
