import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import './User.css';

const User = ({ user }) => {
    if (!user) return <p>Loading...</p>;
  
    return (
      <div className="user-container">
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
      </div>
    );
  };
  
  export default User;