import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Function to generate initials from a name
const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Function to generate a consistent color based on a string
const stringToColor = (str) => {
  if (!str) return "#6B7280"; // Default gray
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const ChatPage = () => {
  const { id } = useParams(); // Get friend ID from URL
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Simulated friend data (Replace with API call)
    const friendsData = [
      { id: 1, name: "Mark Healy", email: "mhealy6@tcd.ie", profile_image: null, major: "Computer Science", year: "Junior" },
      { id: 2, name: "David Chen", profile_image: null, major: "Business", year: "Senior" },
      { id: 3, name: "Sophia Rodriguez", profile_image: null, major: "Psychology", year: "Sophomore" },
      { id: 4, name: "Niamh Brennan", email: "nbrennan3@tcd.ie", profile_image: null, major: "Business Studies", year: "Senior" },
      { id: 5, name: "Ryan Murphy", email: "rmurphy8@tcd.ie", profile_image: null, major: "Computer Science", year: "Junior" },
    ];
    const friendData = friendsData.find((f) => f.id === parseInt(id));
    setFriend(friendData);

    // More realistic chat conversation history based on the friend
    if (parseInt(id) === 1) {
      setMessages([
        { sender: "Mark Healy", text: "Hey there! Have you looked at the assignment for Data Structures yet?" },
        { sender: "You", text: "Just started looking at it. Seems challenging!" },
        { sender: "Mark Healy", text: "Yeah it's a tough one! I was thinking we could work together on it?" },
        { sender: "You", text: "That would be great! When are you free to meet up?" },
        { sender: "Mark Healy", text: "How about tomorrow at the library around 3pm?" },
      ]);
    } else if (parseInt(id) === 2) {
      setMessages([
        { sender: "David Chen", text: "Hi! Are you going to the business networking event next week?" },
        { sender: "You", text: "I'm planning to. I heard there will be recruiters from several big companies." },
        { sender: "David Chen", text: "Exactly! I'm preparing my resume. Want to review each other's?" },
        { sender: "You", text: "That's a great idea. I could use some feedback." },
      ]);
    } else if (parseInt(id) === 3) {
      setMessages([
        { sender: "Sophia Rodriguez", text: "Hey! Did you get the notes from yesterday's psychology lecture?" },
        { sender: "You", text: "Yes, I did. Do you need them?" },
        { sender: "Sophia Rodriguez", text: "Please! I had to miss class for a doctor's appointment." },
        { sender: "You", text: "No problem, I'll share my Google Doc with you." },
        { sender: "Sophia Rodriguez", text: "You're a lifesaver! Thank you so much!" },
      ]);
    } else if (parseInt(id) === 4) {
      setMessages([
        { sender: "Niamh Brennan", text: "Hey! Do you have notes from today's Financial Accounting lecture?" },
        { sender: "You", text: "Yes, I took detailed notes. Would you like me to share them?" },
        { sender: "Niamh Brennan", text: "That would be amazing! I had to leave early for a meeting." },
        { sender: "You", text: "No problem at all. I'll send you my notes from today's lecture" },
        { sender: "Niamh Brennan", text: "Thanks so much! You're a lifesaver!" },
      ]);
    } else if (parseInt(id) === 5) {
      setMessages([
        { sender: "Ryan Murphy", text: "Have you started on the group project for Advanced Programming yet?" },
        { sender: "You", text: "I've been researching some ideas. What about you?" },
        { sender: "Ryan Murphy", text: "Same here. I found some good resources we could use." },
        { sender: "You", text: "Great! We should start putting together a plan." },
        { sender: "Ryan Murphy", text: "Do you want to meet up to work on the group project?" },
      ]);
    }
  }, [id]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user's message
    setMessages([...messages, { sender: "You", text: newMessage }]);
    setNewMessage("");
    
    // Auto-response functionality has been disabled
    // No automatic typing indicator or response messages
  };

  if (!friend) return <p className="text-center text-gray-500">Loading chat...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {/* Back Button */}
      <button 
        onClick={() => navigate("/messages")}
        className="flex items-center text-gray-700 hover:text-blue-500 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      {/* Chat Header */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
        {friend.profile_image ? (
          <img src={friend.profile_image} alt={friend.name} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: stringToColor(friend.name) }}
          >
            {getInitials(friend.name)}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{friend.name}</h2>
          <p className="text-sm text-gray-600">{friend.major} • {friend.year}</p>
        </div>
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
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
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
