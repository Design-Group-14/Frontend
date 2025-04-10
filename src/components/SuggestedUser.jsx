import { useState, useEffect } from "react";

const SuggestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch users from backend API
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Use the existing users API endpoint
        const response = await fetch('http://localhost:8000/auth/users/');
        
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        
        const data = await response.json();
        console.log("Fetched users:", data);
        
        // Format user data for display - only include ID and email
        const formattedUsers = data.users.map((user) => ({
          id: user.id,
          email: user.email || `user${user.id}@example.com`
        }));
        
        // Take a random subset of users (5 users or all if less than 5)
        const shuffled = [...formattedUsers].sort(() => 0.5 - Math.random());
        setUsers(shuffled.slice(0, 5));
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load suggestions");
        
        // Fallback to sample data if API fails
        fallbackToSampleData();
      } finally {
        setLoading(false);
      }
    };
    
    const fallbackToSampleData = () => {
      // Sample data as fallback when API fails - only include ID and email
      const sampleUsers = [
        { 
          id: 101, 
          email: "mhealy6@tcd.ie"
        },
        { 
          id: 102, 
          email: "albogacs@tcd.ie"
        },
        { 
          id: 103, 
          email: "stoodt@tcd.ie"
        },
        { 
          id: 104, 
          email: "thomass@tcd.ie"
        },
        { 
          id: 105, 
          email: "jsmith42@tcd.ie"
        }
      ];
      
      // Shuffle the sample users
      const shuffled = [...sampleUsers].sort(() => 0.5 - Math.random());
      setUsers(shuffled);
    };
    
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 p-5 rounded-lg shadow mt-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">People You May Know</h2>
        <div className="flex justify-center items-center p-5">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-500">Loading suggestions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow mt-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">People You May Know</h2>
      {error ? (
        <p className="text-center text-red-500 text-sm">{error}</p>
      ) : (
        <>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
                <p className="text-gray-800 max-w-[50%] truncate">{user.email}</p>
                <button className="text-blue-500 border border-blue-500 px-4 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition">
                  Follow
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button 
              className="text-blue-500 text-sm font-medium hover:underline"
              onClick={() => window.location.reload()}
            >
              See More Suggestions
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SuggestedUsers;