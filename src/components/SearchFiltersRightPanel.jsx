import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchFiltersRightPanel({
  setIsAuthenticated,
  onlyFriends,
  setOnlyFriends,
  nearMe,
  setNearMe,
  inMyCourse,
  setInMyCourse,
  recent,
  setRecent,
  sameGraduationYear,
  setSameGraduationYear,
  searchType,
}) {
  const navigate = useNavigate();

  console.log("SearchFiltersRightPanel - searchType:", searchType);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      <div className="space-y-4">
        <h2 className="font-semibold text-xl mb-2">Search Filters</h2>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={onlyFriends}
              onChange={() => setOnlyFriends(!onlyFriends)}
            />
            <span>Only Friends</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={nearMe}
              onChange={() => setNearMe(!nearMe)}
            />
            <span>Near Me</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={inMyCourse}
              onChange={() => setInMyCourse(!inMyCourse)}
            />
            <span>In My Course</span>
          </label>
        </div>

        {/* Show "Same Graduation Year" only for user search */}
        {searchType === "users" && (
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={sameGraduationYear}
                onChange={() => setSameGraduationYear(!sameGraduationYear)}
              />
              <span>Same Graduation Year</span>
            </label>
          </div>
        )}

        {/* Show "Recent" toggle only for posts */}
        {searchType === "posts" && (
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={recent}
                onChange={() => setRecent(!recent)}
              />
              <span>Recent</span>
            </label>
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 w-full"
      >
        <LogOut className="w-6 h-6 mr-2" />
        <span className="text-lg">Logout</span>
      </button>
    </nav>
  );
}
