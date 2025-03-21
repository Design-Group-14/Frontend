import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ChatPage = () => {
  const { id } = useParams(); // Get friend ID from URL
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Simulated friend data (Replace with API call)
    const friendsData = [
      { id: 1, name: "Alice Johnson", avatar: "https://i.pravatar.cc/50?img=1" },
      { id: 2, name: "Mark Lee", avatar: "https://i.pravatar.cc/50?img=2" },
      { id: 3, name: "John Doe", avatar: "https://i.pravatar.cc/50?img=3" },
    ];
    const friendData = friendsData.find((f) => f.id === parseInt(id));
    setFriend(friendData);

    // Simulated chat messages (Replace with actual chat API)
    setMessages([
      { sender: "Alice Johnson", text: "Hey, how’s it going?" },
      { sender: "You", text: "All good! What about you?" },
    ]);
  }, [id]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: "You", text: newMessage }]);
    setNewMessage("");
  };

  if (!friend) return <p className="text-center text-gray-500">Loading chat...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {/* ✅ Back Button */}
      <button 
        onClick={() => navigate("/messages")}
        className="flex items-center text-gray-700 hover:text-blue-500 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      {/* Chat Header */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
        <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full" />
        <h2 className="text-xl font-semibold">{friend.name}</h2>
      </div>

      {/* Chat Messages */}
      <div className="bg-gray-100 p-4 rounded-lg shadow mt-4 h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`p-2 my-2 rounded-lg ${
              msg.sender === "You" ? "bg-blue-500 text-white ml-auto" : "bg-white text-gray-700"
            } w-fit max-w-xs`}
          >
            <strong>{msg.sender !== "You" && msg.sender + ": "}</strong>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
