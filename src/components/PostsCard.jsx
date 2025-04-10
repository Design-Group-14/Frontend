const PostCard = ({ post }) => {
  const looksLikeCoordinates = (text) => {
    return /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(text);
  };

  const isValidLocation = post.location && !looksLikeCoordinates(post.location);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 max-w-lg w-full relative">
      
      {isValidLocation && (
        <div className="absolute top-2 left-2 bg-white bg-opacity-80 text-xs text-gray-700 px-2 py-1 rounded shadow">
          📍 {post.location}
        </div>
      )}

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
    </div>
  );
};

export default PostCard;
