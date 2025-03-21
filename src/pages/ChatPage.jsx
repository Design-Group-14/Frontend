import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { id } = useParams(); // Get friend's ID from URL
  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Simulated friend data
    const friends = [
      { id: 1, name: "Alice Johnson", avatar: "https://i.pravatar.cc/50?img=1" },
      { id: 2, name: "Mark Lee", avatar: "https://i.pravatar.cc/50?img=2" },
      { id: 3, name: "John Smith", avatar: "https://i.pravatar.cc/50?img=3" },
    ];

    const selectedFriend = friends.find((f) => f.id === parseInt(id));
    setFriend(selectedFriend);

    // Simulated chat history
    setMessages([
      { sender: "You", text: "Hey, how’s it going?" },
      { sender: selectedFriend?.name, text: "Pretty good! You?" },
      { sender: "You", text: "Just working on my project." },
    ]);
  }, [id]);

  // ✅ Function to send a new message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = { sender: "You", text: newMessage };
    setMessages([...messages, newMsg]); // ✅ Instantly updates the UI
    setNewMessage(""); // ✅ Clear input field
  };

  if (!friend) return <p className="text-center text-gray-600">Loading chat...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center mb-4">
        <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full mr-3" />
        <h2 className="text-xl font-bold">{friend.name}</h2>
      </div>

      {/* Messages Display */}
      <div className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 max-w-xs rounded-lg ${
              msg.sender === "You" ? "bg-blue-500 text-white ml-auto" : "bg-white text-black"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Send Message Input */}
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
