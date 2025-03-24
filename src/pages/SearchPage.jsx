// src/pages/SearchPage.jsx

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PostCard from "../components/PostsCard"; // ✅ Import your PostCard
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// Example user data (if you want to search for users)
const MOCK_USERS = [
  {
    id: 101,
    username: "Alice Johnson",
    friend: true,
    location: "Dublin, Ireland",
    course: "CS",
    date: "2023-02-05",
  },
  {
    id: 102,
    username: "Mark Lee",
    friend: false,
    location: "San Francisco, USA",
    course: "Business",
    date: "2023-02-10",
  },
  {
    id: 103,
    username: "Sophia Wang",
    friend: true,
    location: "Paris, France",
    course: "CS",
    date: "2023-03-01",
  },
  {
    id: 104,
    username: "John Doe",
    friend: false,
    location: "New York, USA",
    course: "Engineering",
    date: "2023-03-10",
  },
];

// Updated posts that include all filter fields (friend, course, date)
const allPosts = [
  {
    id: 1,
    title: "Weekend Vibes",
    content: "Excited for the weekend! 🎉",
    image_url:
      "https://cdn2.hubspot.net/hubfs/364394/blogs/Admit-A-Bull/images/blog-post/080618-the-importance-of-sleep-for-college-students/the-importance-of-sleep-for-college-students-index.jpg",
    location: "Dublin, Ireland",
    user: "Alice Johnson",
    friend: true,
    course: "CS",
    date: "2023-02-25",
  },
  {
    id: 2,
    title: "Project Complete!",
    content: "Just finished my project! 💻",
    image_url:
      "https://www.universityofcalifornia.edu/sites/default/files/styles/article_default_banner/public/college_voting_faq_header.jpg?h=7eca08bd&itok=3bUKecU1",
    location: "San Francisco, USA",
    user: "Mark Lee",
    friend: false,
    course: "Business",
    date: "2023-01-15",
  },
  {
    id: 3,
    title: "Sunset Bliss",
    content: "Beautiful sunset today! 🌅",
    image_url:
      "https://due.uci.edu/files/2017/08/uci_beach_august_nl.png",
    location: "Paris, France",
    user: "Sophia Wang",
    friend: true,
    course: "CS",
    date: "2023-03-05",
  },
  {
    id: 4,
    title: "Game Night!",
    content: "Anyone up for a game night? 🎲",
    image_url:
      "https://www.usnews.com/object/image/00000190-3ba9-d6ee-a7ff-7fbb4cfe0000/gettyimages-1473712269.jpg?update-time=1718987895511&size=responsive640",
    location: "New York, USA",
    user: "John Doe",
    friend: false,
    course: "Engineering",
    date: "2023-03-12",
  },
];

function SearchPage({ onlyFriends, nearMe, inMyCourse, recent }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Decide whether searching "users" or "posts"
  const [searchType, setSearchType] = useState("users");
  // The final list of results
  const [results, setResults] = useState([]);

  const [firestoreUsers, setFirestoreUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersFromFirestore = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const userArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFirestoreUsers(userArray);
      } catch (error) {
        console.error("Error fetching users from Firestore:", error);
      }
    };

    fetchUsersFromFirestore();
  }, []);


  useEffect(() => {
    // If empty query, no results
    if (!query.trim()) {
      setResults([]);
      return;
    }

    let data;
    if (searchType === "users") {
      // Filter from user array
      data = firestoreUsers.filter((u) => {
        // Combine relevant fields for searching
        const combined = (u.firstName + u.lastName + u.email + (u.course || "")).toLowerCase();
        return combined.includes(query.toLowerCase());
      });
    } else {
      // Filter the local posts array
      data = allPosts.filter((p) => {
        const combined = (p.title + p.content + p.user + p.location).toLowerCase();
        return combined.includes(query.toLowerCase());
      });

      // Optionally apply filters like onlyFriends, nearMe, etc.
      if (onlyFriends) {
        data = data.filter((item) => item.friend);
      }
      if (nearMe) {
        data = data.filter((item) => item.location === "Dublin, Ireland");
      }
      if (inMyCourse) {
        data = data.filter((item) => item.course === "CS");
      }
      if (recent) {
        data = data.filter((item) => item.date > "2023-02-01");
      }
    }

    setResults(data);
  }, [query, searchType, firestoreUsers, onlyFriends, nearMe, inMyCourse, recent]);

  //////////////////////////////
  // 3) Handling search + click
  //////////////////////////////
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const handleResultClick = (item) => {
    if (searchType === "users") {
      // Navigate to e.g. /profile/:id
      navigate(`/profile/${item.id}`);
    } else {
      navigate(`/post/${item.id}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* (A) Search Input */}
      <form onSubmit={handleSearchSubmit} className="flex justify-center mb-4">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

      {/* (B) Toggle */}
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

      {/* (C) Results */}
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
                <p className="font-bold">{item.firstName} {item.lastName}</p>
                <p className="text-sm text-gray-600">Email: {item.email}</p>
                <p className="text-sm text-gray-600">Course: {item.course}</p>
              </div>
            ) : (
              <div
                key={item.id}
                onClick={() => handleResultClick(item)}
                className="p-4 bg-white shadow rounded cursor-pointer hover:bg-gray-50 transition"
              >
                {/* optional: post image */}
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