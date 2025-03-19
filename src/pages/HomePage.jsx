import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="text-center w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to TrinityConnect</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          A private social network for Trinity students to connect, share, and engage with the college community.
        </p>

        {/* ✅ Button Wrapper for Proper Centering */}
        <div className="flex justify-center space-x-4 mt-6">
          <button 
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          <button 
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Join Now
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
