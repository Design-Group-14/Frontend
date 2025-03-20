import { Home, Bell, Mail, User, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from '../assets/Badge.jpg'
import SearchField from "./SearchFields";
import TrendingTopics from "./TrendingTopics";
import SuggestedUsers from "./SuggestedUser";

const Navbar = () => {
  return (
    <nav className="absolute top-0 right-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      {/* Logo */}
      <div>
        <SearchField />
      </div>
        <TrendingTopics />
      <div>
        <SuggestedUsers />
      </div>
      <div>

      </div>
      
    </nav>
  );
};

export default Navbar;