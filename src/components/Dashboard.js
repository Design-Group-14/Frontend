import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <div className="badge-container">
          <img src="/Badge.jpg" alt="Badge" className="badge-img" />
        </div>
        <div className="sidebar-links">
          <Link to="/home" className="sidebar-item">🏠 Home</Link>
          <Link to="/explore" className="sidebar-item">🔍 Explore</Link>
          <Link to="/notifications" className="sidebar-item">🔔 Notifications</Link>
          <Link to="/messages" className="sidebar-item">✉️ Messages</Link>
          <Link to="/user/${user.username}" className="sidebar-item">👤 Profile</Link>
          <button className="post-button">Post</button>
        </div>
      </div>

      <div className="divider left-divider"></div>

      <div className="main-content">
        <h1>Home</h1>
        <div className="post-box">
          <textarea placeholder="What's happening?" />
          <button className="post-btn">Post</button>
        </div>
        <div className="separator"></div>

        <div className="feed">
          <button className="post-filter-btn">🔥 Post From Friends</button>
          <div className="separator-vertical"></div>
          <button className="post-filter-btn">📍 Posts Near You</button>
        </div>
      </div>

      <div className="divider right-divider"></div>

      <div className="right-panel">
        <input type="text" className="search-bar" placeholder="Search..." />
        <div className="widget">
          <h3>Who to follow</h3>
          <div className="separator"></div>
          <div className="suggestion">🔵 @exampleuser</div>
          <div className="separator"></div>
          <div className="suggestion">🔵 @randomuser</div>
        </div>
        <div className="widget">
          <h3>Trending Topics</h3>
          <div className="separator"></div>
          <div className="trend">🔥 #TrendingTopic</div>
          <div className="separator"></div>
          <div className="trend">📈 #BreakingNews</div>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
