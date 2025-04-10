import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MessagesPage = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Enhanced friends list with realistic conversations and user details
    setFriends([
      {
        id: 1,
        name: "Mark Healy",
        username: "@mark_healy",
        email: "mhealy6@tcd.ie",
        avatar: "",
        lastMessage: { sender: "Mark Healy", text: "How about tomorrow at the library around 3pm?" },
        unread: true,
        lastActive: "10 min ago",
        major: "Computer Science",
        year: "Junior"
      },
      
    ]);
  }, []);

  // Function to mark a message as read when clicked
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
                  onClick={() => markAsRead(friend.id)}
                >
                  {/* Avatar with online indicator */}
                  <div className="relative mr-4">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {friend.lastActive === "Online" && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>

                  {/* Name, Major & Last Message */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline">
                      <h2 className={`font-semibold ${friend.unread ? "font-bold" : "font-normal"}`}>
                        {friend.name}
                      </h2>
                      <span className="text-xs text-gray-500">{friend.lastActive}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{friend.major} • {friend.year}</p>
                    <p className={`text-gray-500 text-sm ${friend.unread ? "font-semibold" : "font-normal"}`}>
                      <span className="font-medium">{friend.lastMessage.sender === "You" ? "You: " : ""}</span>
                      {friend.lastMessage.text}
                    </p>
                  </div>
                  
                  {/* Unread indicator */}
                  {friend.unread && (
                    <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
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
