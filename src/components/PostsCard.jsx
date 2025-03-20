const PostCard = ({ post }) => {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-4 max-w-lg w-full">
        {/* Optional Post Image */}
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
  
        {/* Post Content */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
          <p className="text-gray-700 mt-2">{post.content}</p>
        </div>
  
        {/* Optional Post Location */}
        {post.location && (
          <div className="mt-4 text-sm text-gray-500">
            📍 <span>{post.location}</span>
          </div>
        )}
      </div>
    );
  };
  
  export default PostCard;