import { Users, MessageCircle, Bell, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to TrinityConnect</h1>
        <p className="text-lg text-gray-600 max-w-xl">
          A private social network for Trinity students to connect, share, and engage with the college community.
        </p>
        <Link to="/register">
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Join Now
          </button>
        </Link>
      </div>


      
    </div>
  );
};

export default HomePage;