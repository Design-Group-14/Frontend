import { Home, Bell, Mail, User, PlusCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Badge from '../assets/Badge.jpg';
import SearchField from "./SearchFields";
import TrendingTopics from "./TrendingTopics";
import SuggestedUsers from "./SuggestedUser";
import { Search } from "lucide-react";
import React, { useState } from "react";

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false); // ✅ Set authentication to false
    localStorage.removeItem("isAuthenticated"); // ✅ Remove authentication from storage
    navigate("/"); // ✅ Redirect to homepage
  };

  return (
    <nav className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      {/* Search & Suggested Users */}
      <div>
        <SearchField />
        <TrendingTopics />
        <SuggestedUsers />
      </div>

      {/* ✅ Logout Button */}
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