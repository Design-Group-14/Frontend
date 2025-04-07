import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LeftNavbar from "./components/LeftNavbar";
import SearchField from "./components/SearchFields";
import TrendingTopics from "./components/TrendingTopics";
import SuggestedUsers from "./components/SuggestedUser";
import SearchBar from "./components/SearchBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import PostsFeed from "./components/PostsFeed";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import ChatPage from "./pages/ChatPage";
import SearchPage from "./pages/SearchPage";
import SearchFiltersRightPanel from "./components/SearchFiltersRIghtPanel";

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
      <AppContent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Router>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();
  const showFullLayout =
    isAuthenticated &&
    (location.pathname.startsWith("/posts") ||
      location.pathname.startsWith("/post/") ||
      location.pathname === "/dashboard" ||
      location.pathname.startsWith("/profile") ||
      location.pathname.startsWith("/messages") ||
      location.pathname.startsWith("/notifications") ||
      location.pathname === "/search");

  const isSearchPage = location.pathname === "/search";

  // Lift filter states and search mode so they are shared between SearchPage and the filters panel
  const [onlyFriends, setOnlyFriends] = useState(false);
  const [nearMe, setNearMe] = useState(false);
  const [inMyCourse, setInMyCourse] = useState(false);
  const [recent, setRecent] = useState(false);
  const [sameGraduationYear, setSameGraduationYear] = useState(false);
  const [searchType, setSearchType] = useState("users"); // "users" or "posts"

  return (
    <div className="flex min-h-screen">
      {showFullLayout && <LeftNavbar />}

      <div className="flex-grow px-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/register"
            element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/" />
            }
          />
          <Route
            path="/posts"
            element={
              isAuthenticated ? <PostsFeed type="all" /> : <Navigate to="/" />
            }
          />
          <Route
            path="/post/:id"
            element={isAuthenticated ? <PostPage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <ProfilePage setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/profile/:id"
            element={
              isAuthenticated ? (
                <ProfilePage setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/messages"
            element={
              isAuthenticated ? <MessagesPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/messages/:id"
            element={
              isAuthenticated ? <ChatPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated ? <NotificationsPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/search"
            element={
              isAuthenticated ? (
                <SearchPage
                  onlyFriends={onlyFriends}
                  nearMe={nearMe}
                  inMyCourse={inMyCourse}
                  recent={recent}
                  sameGraduationYear={sameGraduationYear}
                  searchType={searchType}
                  setSearchType={setSearchType}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>

      {showFullLayout &&
        (isSearchPage ? (
          <SearchFiltersRightPanel
            setIsAuthenticated={setIsAuthenticated}
            onlyFriends={onlyFriends}
            setOnlyFriends={setOnlyFriends}
            nearMe={nearMe}
            setNearMe={setNearMe}
            inMyCourse={inMyCourse}
            setInMyCourse={setInMyCourse}
            recent={recent}
            setRecent={setRecent}
            sameGraduationYear={sameGraduationYear}
            setSameGraduationYear={setSameGraduationYear}
            searchType={searchType}
          />
        ) : (
          <SearchBar setIsAuthenticated={setIsAuthenticated} />
        ))}
    </div>
  );
}

export default App;
