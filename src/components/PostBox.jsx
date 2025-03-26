import React, { useState } from "react";

const PostBox = () => {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handlePost = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/posts/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title || 'Untitled Post',
          content: post,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }

      const data = await response.json();
      console.log('Post created successfully:', data);
      setPost(""); // Clear input after posting
      setTitle(""); // Clear title after posting
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.message || 'Failed to create post');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">What's happening?</h2>
      {error && (
        <div className="mb-4 text-red-500">{error}</div>
      )}
      <input
        type="text"
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Post title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
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
