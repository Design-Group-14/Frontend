import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchField from "./SearchFields";
import SuggestedUsers from "./SuggestedUser";

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6 flex flex-col justify-between">
      {/* Search & Suggested Users */}
      <div>
        <SearchField />
        <SuggestedUsers />
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 w-full"
      >
        <LogOut className="w-6 h-6 mr-2" />
        <span className="text-lg">Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;