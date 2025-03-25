import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "./PostsCard";

const PostsFeed = ({ type = "friends" }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/posts/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        console.log('Fetched posts:', data);
        
        // Transform the data to match the expected format
        const formattedPosts = data.posts.map(post => ({
          id: post.id,
          title: post.title || 'Untitled Post',
          content: post.content,
          image_url: post.image_url,
          user: post.user,
          // Add location if available from backend
          location: post.latitude && post.longitude ? `${post.latitude}, ${post.longitude}` : null,
          created_at: post.created_at
        }));
        
        setPosts(formattedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on type if needed
  const displayPosts = type === "friends" ? posts.slice(0, 2) : posts;

  if (loading) {
    return <div className="w-full text-center py-8">Loading posts...</div>;
  }

  if (error) {
    return <div className="w-full text-center py-8 text-red-500">{error}</div>;
  }

  if (displayPosts.length === 0) {
    return <div className="w-full text-center py-8">No posts found. Be the first to create one!</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      {displayPosts.map((post) => (
        <Link key={post.id} to={`/post/${post.id}`} className="block hover:opacity-80 transition">
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  );
};

export default PostsFeed;