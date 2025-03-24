import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const shareText = `${post.title} - ${post.content}`;
    navigator.clipboard.writeText(shareText);
    alert("Post copied to clipboard!");
  };

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white shadow-lg rounded-2xl p-4 max-w-lg w-full cursor-pointer hover:opacity-90 transition"
    >
      {post.image_url ? (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-48 object-cover rounded-xl"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
        <p className="text-gray-700 mt-2">{post.content}</p>
      </div>

      {post.location && (
        <div className="mt-4 text-sm text-gray-500">
          📍 <span>{post.location}</span>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${
            liked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
          }`}
        >
          ❤️ {liked ? "Liked" : "Like"} ({likeCount})
        </button>
        <button
          onClick={handleShare}
          className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl text-sm font-medium"
        >
          🔗 Share
        </button>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    location: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
};

export default PostCard;