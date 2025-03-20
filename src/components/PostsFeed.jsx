import React from "react";

const PostsFeed = ({ type }) => {
  // Example post data
  const posts =
    type === "friends"
      ? [
          { id: 1, user: "Alice Johnson", text: "Excited for the weekend! 🎉" },
          { id: 2, user: "Mark Lee", text: "Just finished my project! 💻" },
        ]
      : [
          { id: 3, user: "Sophia Wang", text: "Beautiful sunset today! 🌅" },
          { id: 4, user: "John Doe", text: "Anyone up for a game night? 🎲" },
        ];

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg shadow">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-3 rounded-lg shadow mb-3">
          <p className="text-gray-700 font-medium">{post.user}</p>
          <p className="text-gray-600">{post.text}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsFeed;
