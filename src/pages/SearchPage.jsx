import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PostCard from "../components/PostsCard";

function SearchPage({
  onlyFriends,
  nearMe,
  inMyCourse,
  recent,
  sameGraduationYear,
  searchType,
  setSearchType,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState([]);

  // ---------- USERS: state to hold real users from backend ----------
  const [usersData, setUsersData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);

  // ---------- POSTS: state to hold posts fetched from backend ----------
  const [postsData, setPostsData] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorPosts, setErrorPosts] = useState(null);

  const navigate = useNavigate();

  // Read current user's filtering info from localStorage:
  const [myCourse, setMyCourse] = useState("");
  const [myCountry, setMyCountry] = useState("");
  const [myGraduationYear, setMyGraduationYear] = useState("");

  useEffect(() => {
    setMyCourse(localStorage.getItem("course") || "");
    setMyCountry(localStorage.getItem("country") || "");
    setMyGraduationYear(localStorage.getItem("graduationYear") || "");
  }, []);

  // ----- Fetch Users from backend when "users" is selected -----
  useEffect(() => {
    if (searchType !== "users") return;
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        // Build query params for backend filtering
        const params = [];
        if (query.trim()) {
          params.push(`search=${encodeURIComponent(query)}`);
        }
        if (inMyCourse && myCourse) {
          params.push(`course=${encodeURIComponent(myCourse)}`);
        }
        if (nearMe && myCountry) {
          params.push(`country=${encodeURIComponent(myCountry)}`);
        }
        if (onlyFriends) {
          params.push("only_friends=true");
        }
        let endpoint = "http://localhost:8000/auth/users/";
        if (params.length > 0) {
          endpoint += `?${params.join("&")}`;
        }
        console.log("Fetching users from:", endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("Fetched user data:", data);
        // Expect data.users to be an array; transform if needed.
        const formattedUsers = data.users.map((u) => ({
          id: u.id,
          username: u.username || `${u.first_name} ${u.last_name}`,
          email: u.email,
          course: u.course_name || "",
          country: u.country || "",
          graduationYear: u.graduation_year || "",
        }));
        setUsersData(formattedUsers);
        setErrorUsers(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setErrorUsers(err.message);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, [searchType, query, onlyFriends, nearMe, inMyCourse, myCourse, myCountry]);

  // ----- Fetch posts from backend when "posts" is selected -----
  useEffect(() => {
    if (searchType !== "posts") return;
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const response = await fetch("http://localhost:8000/api/posts/");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        const formattedPosts = data.posts.map((post) => ({
          id: post.id,
          title: post.title || "Untitled Post",
          content: post.content,
          image_url: post.image_url,
          user: post.user,
          location:
            post.latitude && post.longitude
              ? `${post.latitude}, ${post.longitude}`
              : post.location || null,
          created_at: post.created_at,
          friend: post.friend || false,
          course: post.course || "",
          date: post.created_at,
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
  }, [searchType]);

  // ----- Filter Logic / Setting results -----
  useEffect(() => {
    console.log("SearchPage filtering effect triggered", {
      query,
      searchType,
      myGraduationYear,
      sameGraduationYear,
      usersData,
    });
    if (!query.trim()) {
      setResults([]);
      return;
    }
    if (searchType === "users") {
      let filteredUsers = usersData;
      // Apply "Same Graduation Year" filter if enabled
      if (sameGraduationYear && myGraduationYear) {
        filteredUsers = filteredUsers.filter(
          (u) => u.graduationYear === myGraduationYear
        );
        console.log("My Graduation Year:", myGraduationYear);
        console.log("User Graduation Year:", u.graduationYear);
      }
      // Also perform local text filtering
      filteredUsers = filteredUsers.filter((u) => {
        const combined = (u.username + u.email + u.course).toLowerCase();
        return combined.includes(query.toLowerCase());
      });
      setResults(filteredUsers);
    } else {
      let filteredPosts = postsData.filter((p) => {
        const combined = (p.title + p.content + p.user + (p.location || "")).toLowerCase();
        return combined.includes(query.toLowerCase());
      });
      if (onlyFriends) {
        filteredPosts = filteredPosts.filter((p) => p.friend);
      }
      if (nearMe) {
        filteredPosts = filteredPosts.filter((p) => p.location === myCountry);
      }
      if (inMyCourse) {
        filteredPosts = filteredPosts.filter((p) => p.course === myCourse);
      }
      if (recent) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filteredPosts = filteredPosts.filter((p) => {
          if (!p.created_at) return false;
          return new Date(p.created_at) > oneWeekAgo;
        });
      }
      setResults(filteredPosts);
    }
  }, [
    query,
    searchType,
    usersData,
    postsData,
    onlyFriends,
    nearMe,
    inMyCourse,
    recent,
    myCourse,
    myCountry,
    myGraduationYear,
    sameGraduationYear,
  ]);

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
      {/* Search Form */}
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

      {/* Toggle Buttons */}
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

      {/* Loading / Error indicators */}
      {searchType === "users" && loadingUsers && (
        <div className="text-center text-xl mt-8">Loading users...</div>
      )}
      {searchType === "users" && errorUsers && (
        <div className="text-center text-red-500 text-xl mt-8">{errorUsers}</div>
      )}
      {searchType === "posts" && loadingPosts && (
        <div className="text-center text-xl mt-8">Loading posts...</div>
      )}
      {searchType === "posts" && errorPosts && (
        <div className="text-center text-red-500 text-xl mt-8">{errorPosts}</div>
      )}

      {/* Display Results */}
      <div className="max-w-2xl mx-auto space-y-4 mt-4">
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
                <p className="text-sm text-gray-600">
                  Graduation Year: {item.graduationYear}
                </p>
              </div>
            ) : (
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

export default SearchPage;
