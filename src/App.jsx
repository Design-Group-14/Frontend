import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftNavbar from "./components/LeftNavbar";
import SearchField from "./components/SearchFields";
import TrendingTopics from "./components/TrendingTopics";
import SuggestedUsers from "./components/SuggestedUser";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
    const [currentView, setCurrentView] = useState("home");

    return (
        <Router>
            <div className="flex min-h-screen">
                {/* ✅ Left Sidebar */}
                <LeftNavbar />

                {/* ✅ Main Content Area (Center) */}
                <div className="flex-grow flex justify-center items-center px-20">
                    <Routes>
                        <Route path="/" element={<HomePage setCurrentView={setCurrentView} />} />
                        <Route path="/login" element={<LoginPage setCurrentView={setCurrentView} />} />
                        <Route path="/register" element={<RegisterPage setCurrentView={setCurrentView} />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </div>

                {/* ✅ Right Sidebar - Search, Trends, Suggested Users */}
                <div className="w-80 bg-white shadow-lg p-6 flex flex-col space-y-6 fixed right-0 top-0 h-full">
                    <SearchField />
                    <TrendingTopics />
                    <SuggestedUsers />
                </div>
            </div>
        </Router>
    );
}

export default App;
