import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import './User.css';

const User = ({ user }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    if (!user) return <p>Loading...</p>;
    

    return (
      <div className="user-container">
        <div className="sidebar">
            <div className="badge-container">
                <img src="/Badge.jpg" alt="Badge" className="badge-img" />
            </div>
            <div className="sidebar-links">
                <Link to="/dashboard" className="sidebar-item">🏠 Home</Link>
                <Link to="/explore" className="sidebar-item">🔍 Explore</Link>
                <Link to="/notifications" className="sidebar-item">🔔 Notifications</Link>
                <Link to="/messages" className="sidebar-item">✉️ Messages</Link>
                <button className="post-button">Post</button>
            </div>
        </div>

        <div className="divider left-divider"></div>

        <div className="main-content">
            <div className="user-header">
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div>
                <h2>{user.name}</h2>
                <p>@{user.username}</p>
              </div>
            </div>
            <p className="user-bio">{user.bio}</p>
            <div className="separator"></div>


            <h3>Posts</h3>
            <div className="feed">
              {user.posts && user.posts.length > 0 ? (
                user.posts.map((post) => (
                  <div key={post.id} className="post">
                    <p>{post.content}</p>
                    <span className="post-date">{post.date}</span>
                  </div>
                ))
              ) : (
                <p>No posts yet.</p>
              )}
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
  
  export default User;