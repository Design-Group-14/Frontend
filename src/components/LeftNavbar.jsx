import { Home, Bell, Mail, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const LeftNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="absolute top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      <div>
        <img src="/Badge.jpg" className="w-full" alt="Badge" />
      </div>
      <ul className="flex flex-col space-y-6 mt-8">
        <li>
          <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-blue-500">
            <Home className="w-6 h-6 mr-3" />
            <span className="text-lg">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/explore" className="flex items-center text-gray-700 hover:text-blue-500">
            <Bell className="w-6 h-6 mr-3" />
            <span className="text-lg">Explore</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="flex items-center text-gray-700 hover:text-blue-500">
            <Mail className="w-6 h-6 mr-3" />
            <span className="text-lg">Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-500">
            <User className="w-6 h-6 mr-3" />
            <span className="text-lg">Profile</span>
          </Link>
        </li>
      </ul>

      {/* ✅ Log Out Button (Bottom Left) */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center"
      >
        <LogOut className="w-6 h-6 mr-2" />
        <span className="text-lg">Log Out</span>
      </button>
    </nav>
  );
};

export default LeftNavbar;
