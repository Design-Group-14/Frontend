import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MessagesPage = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Simulated friend list with unread status
    setFriends([
      {
        id: 1,
        name: "Alice Johnson",
        username: "@alice",
        avatar: "https://i.pravatar.cc/50?img=1",
        lastMessage: { sender: "You", text: "Hey, how’s it going?" },
        unread: true, // ✅ Initially unread
      },
      {
        id: 2,
        name: "Mark Lee",
        username: "@marklee",
        avatar: "https://i.pravatar.cc/50?img=2",
        lastMessage: { sender: "Mark Lee", text: "Let's catch up later!" },
        unread: false, // ✅ Already read
      },
      {
        id: 3,
        name: "John Smith",
        username: "@johnsmith",
        avatar: "https://i.pravatar.cc/50?img=3",
        lastMessage: { sender: "You", text: "See you at the event!" },
        unread: true, // ✅ Initially unread
      },
    ]);
  }, []);

  // ✅ Function to mark a message as read when clicked
  const markAsRead = (id) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === id ? { ...friend, unread: false } : friend
      )
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      <div className="bg-white p-4 rounded-lg shadow">
        {friends.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {friends.map((friend) => (
              <li key={friend.id}>
                <Link
                  to={`/messages/${friend.id}`}
                  className="flex items-center p-3 hover:bg-gray-100 transition"
                  onClick={() => markAsRead(friend.id)} // ✅ Marks as read when clicked
                >
                  {/* Avatar */}
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />

                  {/* Name & Last Message */}
                  <div className="flex-grow">
                    <h2 className={`font-semibold ${friend.unread ? "font-bold" : "font-normal"}`}>
                      {friend.name}
                    </h2>
                    <p className={`text-gray-500 text-sm ${friend.unread ? "font-semibold" : "font-normal"}`}>
                      <span className="font-medium">{friend.lastMessage.sender}: </span>
                      {friend.lastMessage.text}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
