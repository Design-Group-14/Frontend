const SuggestedUsers = () => {
    const users = [
      { name: "Alice Johnson", handle: "@alice" },
      { name: "Mark Lee", handle: "@marklee" },
      { name: "Sophia Wang", handle: "@sophia" },
    ];
  
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow mt-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Suggested Users</h2>
        <ul className="space-y-3">
          {users.map((user, index) => (
            <li key={index} className="flex items-center justify-between">
              {/* User Info - Stick to Left */}
              <div className="flex flex-col items-start">
                <p className="text-gray-700 font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.handle}</p>
              </div>
  
              {/* Follow Button - Align Right */}
              <button className="text-blue-500 border border-blue-500 px-3 py-1 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition">
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SuggestedUsers;