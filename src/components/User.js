import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import './User.css';

const User = ({ user }) => {
    if (!user) return <p>Loading...</p>;
  
    return (

      <div className="user-container">
        <div className="sidebar">
            <div className="badge-container">
                <img src="/Badge.jpg" alt="Badge" className="badge-img" />
            </div>
            <div className="sidebar-links">
                <Link to="/home" className="sidebar-item">🏠 Home</Link>
                <Link to="/explore" className="sidebar-item">🔍 Explore</Link>
                <Link to="/notifications" className="sidebar-item">🔔 Notifications</Link>
                <Link to="/messages" className="sidebar-item">✉️ Messages</Link>
                <button className="post-button">Post</button>
            </div>
        </div>

        <div className="divider left-divider"></div>

        <div className="user-header">
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <div>
            <h2>{user.name}</h2>
            <p>@{user.username}</p>
          </div>
        </div>
        <p className="user-bio">{user.bio}</p>
        


        <h3>Posts</h3>
        <div className="user-posts">
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

        <div className="divider right-divider"></div>

      </div>
    );
  };
  
  export default User;