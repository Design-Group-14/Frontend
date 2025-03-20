import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LeftNavbar from "./components/LeftNavbar";
import SearchField from "./components/SearchFields";
import TrendingTopics from "./components/TrendingTopics";
import SuggestedUsers from "./components/SuggestedUser";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import PostsFeed from "./components/PostsFeed";
import PostPage from "./pages/PostPage"; // ✅ New import for single post view

import "./App.css";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    useEffect(() => {
        localStorage.setItem("isAuthenticated", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <Router>
            <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </Router>
    );
}

function AppContent({ isAuthenticated, setIsAuthenticated }) {
    const location = useLocation(); 
    const showFullLayout = isAuthenticated && 
    (location.pathname.startsWith("/posts") || 
     location.pathname.startsWith("/post/") || 
     location.pathname === "/dashboard");

    return (
        <div className="flex min-h-screen">
            {showFullLayout && <LeftNavbar />}

            <div className="flex-grow px-20">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route 
                        path="/dashboard" 
                        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/posts" 
                        element={isAuthenticated ? <PostsFeed type="all" /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/post/:id" 
                        element={isAuthenticated ? <PostPage type="all" /> : <Navigate to="/" />}
                    />
                </Routes>
            </div>

            {showFullLayout && (
                <div className="w-80 bg-white shadow-lg p-6 flex flex-col space-y-6 fixed right-0 top-0 h-full">
                    <SearchField />
                    <TrendingTopics />
                    <SuggestedUsers />
                </div>
            )}
        </div>
    );
}

export default App;