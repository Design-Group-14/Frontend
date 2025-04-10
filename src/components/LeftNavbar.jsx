import { Home, Bell, Mail, User, PlusCircle, Users } from "lucide-react"; // ✅ Add `Users` icon
import { Link } from "react-router-dom";
import Badge from '../assets/Badge.jpg';

const Navbar = ({ notificationCount }) => {
  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      {/* Logo */}
      <div>
        <img src={Badge} className="w-full" alt="Badge" />
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col space-y-6 mt-8">
        <li>
          <Link to="/posts" className="flex items-center text-gray-700 hover:text-blue-500">
            <Home className="w-6 h-6 mr-3" />
            <span className="text-lg">Explore</span>
          </Link>
        </li>

        <li>
          <Link to="/notifications" className="flex items-center text-gray-700 hover:text-blue-500 relative">
            <Bell className="w-6 h-6 mr-3" />
            <span className="text-lg">Notifications</span>
          </Link>
        </li>

        <li>
          <Link to="/messages" className="flex items-center text-gray-700 hover:text-blue-500">
            <Mail className="w-6 h-6 mr-3" />
            <span className="text-lg">Messages</span>
          </Link>
        </li>

        <li>
          <Link to="/followers" className="flex items-center text-gray-700 hover:text-blue-500">
            <Users className="w-6 h-6 mr-3" />
            <span className="text-lg">Followers</span> {/* ✅ New button */}
          </Link>
        </li>

        <li>
          <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-500">
            <User className="w-6 h-6 mr-3" />
            <span className="text-lg">Profile</span>
          </Link>
        </li>
      </ul>

      {/* Post Button */}
      <Link to="/dashboard">
        <button className="flex items-center justify-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full">
          <PlusCircle className="w-6 h-6 mr-2" />
          <span className="text-lg">Post</span>
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
