import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostCard from "../components/PostsCard";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/posts/${id}/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        
        const postData = await response.json();
        
        // Format the post data to match what PostCard expects
        const formattedPost = {
          id: postData.id,
          title: postData.title || 'Untitled Post',
          content: postData.content,
          image_url: postData.image_url,
          user: postData.user,
          location: postData.latitude && postData.longitude ? `${postData.latitude}, ${postData.longitude}` : null,
          created_at: postData.created_at
        };
        
        setPost(formattedPost);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl mt-20">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-20">{error}</div>;
  }

  if (!post) {
    return <div className="text-center text-red-500 text-xl mt-20">Post not found</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* Back Button: add ml-64 to push it to the right */}
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-4 ml-20 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        ← Back
      </button>

      <PostCard post={post} />
    </div>
  );
}

export default PostPage;