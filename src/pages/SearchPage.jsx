import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PostCard from "../components/PostsCard";

// For now, we continue to use MOCK_USERS for user search
const MOCK_USERS = [
  { id: 101, username: "Alice Johnson", email: "alice@example.com", course: "CS" },
  { id: 102, username: "Mark Lee", email: "mark@example.com", course: "Business" },
  { id: 103, username: "Sophia Wang", email: "sophia@example.com", course: "CS" },
  { id: 104, username: "John Doe", email: "john@example.com", course: "Engineering" },
];

function SearchPage({ onlyFriends, nearMe, inMyCourse, recent }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [searchType, setSearchType] = useState("users"); // "users" or "posts"
  const [results, setResults] = useState([]);

  // For posts: state to hold posts fetched from backend
  const [postsData, setPostsData] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorPosts, setErrorPosts] = useState(null);

  const navigate = useNavigate();

  // ----- Fetch posts from backend when "posts" is selected -----
  useEffect(() => {
    if (searchType === "posts") {
      const fetchPosts = async () => {
        try {
          setLoadingPosts(true);
          const response = await fetch("http://localhost:8000/api/posts/");
          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }
          const data = await response.json();
          // Transform the data to match what PostCard expects
          const formattedPosts = data.posts.map((post) => ({
            id: post.id,
            title: post.title || "Untitled Post",
            content: post.content,
            image_url: post.image_url,
            user: post.user,
            // If latitude and longitude exist, combine them into a location string; otherwise, use post.location
            location:
              post.latitude && post.longitude
                ? `${post.latitude}, ${post.longitude}`
                : post.location || null,
            created_at: post.created_at,
            // Include filter-related fields if your backend provides them:
            friend: post.friend, // true/false
            course: post.course, // e.g. "CS"
            date: post.created_at, // using created_at as the date for filtering
          }));
          setPostsData(formattedPosts);
          setErrorPosts(null);
        } catch (err) {
          console.error("Error fetching posts:", err);
          setErrorPosts(err.message);
        } finally {
          setLoadingPosts(false);
        }
      };

      fetchPosts();
    }
  }, [searchType]);

  // ----- Filter Logic: Apply search query (and filters) to users or posts -----
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    if (searchType === "users") {
      // Filter MOCK_USERS by name, email, course, etc.
      const filteredUsers = MOCK_USERS.filter((u) => {
        const combined = (u.username + u.email + (u.course || "")).toLowerCase();
        return combined.includes(query.toLowerCase());
      });
      setResults(filteredUsers);
    } else {
      // Filter the postsData fetched from backend
      let filteredPosts = postsData.filter((p) => {
        const combined = (p.title + p.content + p.user + (p.location || "")).toLowerCase();
        return combined.includes(query.toLowerCase());
      });
      // Apply additional filter checkboxes if enabled
      if (onlyFriends) {
        filteredPosts = filteredPosts.filter((p) => p.friend);
      }
      if (nearMe) {
        // Example: "Dublin, Ireland" is considered near
        filteredPosts = filteredPosts.filter((p) => p.location === "Dublin, Ireland");
      }
      if (inMyCourse) {
        filteredPosts = filteredPosts.filter((p) => p.course === "CS");
      }
      if (recent) {
        // For demonstration, assume "recent" means after 2023-02-01
        filteredPosts = filteredPosts.filter((p) => p.date > "2023-02-01");
      }
      setResults(filteredPosts);
    }
  }, [query, searchType, postsData, onlyFriends, nearMe, inMyCourse, recent]);

  // ----- Handlers -----
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const handleResultClick = (item) => {
    if (searchType === "users") {
      navigate(`/profile/${item.id}`, { state: { query, searchType } });
    } else {
      navigate(`/post/${item.id}`, { state: { query, searchType } });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="flex justify-center mb-4">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

      {/* Toggle Buttons for Users vs Posts */}
      <div className="flex justify-center space-x-2 mb-4">
        <button
          onClick={() => setSearchType("users")}
          className={`px-4 py-2 rounded ${
            searchType === "users" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setSearchType("posts")}
          className={`px-4 py-2 rounded ${
            searchType === "posts" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          Posts
        </button>
      </div>

      {/* If Posts: show loading or error messages */}
      {searchType === "posts" && loadingPosts && (
        <div className="text-center text-xl mt-8">Loading posts...</div>
      )}
      {searchType === "posts" && errorPosts && (
        <div className="text-center text-red-500 text-xl mt-8">{errorPosts}</div>
      )}

      {/* Display Results */}
      <div className="max-w-2xl mx-auto space-y-4">
        {results.length === 0 && query.trim() !== "" ? (
          <p className="text-center text-gray-500">No results found.</p>
        ) : (
          results.map((item) =>
            searchType === "users" ? (
              <div
                key={item.id}
                onClick={() => handleResultClick(item)}
                className="p-4 bg-white shadow rounded cursor-pointer hover:bg-gray-50 transition"
              >
                <p className="font-bold">{item.username}</p>
                <p className="text-sm text-gray-600">Email: {item.email}</p>
                <p className="text-sm text-gray-600">Course: {item.course}</p>
              </div>
            ) : (
              // For posts, we display the post card and allow click to view details
              <div
                key={item.id}
                onClick={() => handleResultClick(item)}
                className="cursor-pointer"
              >
                <PostCard post={item} />
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default SearchPage