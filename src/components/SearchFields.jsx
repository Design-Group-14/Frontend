
import { Search } from "lucide-react";

const SearchField = () => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchField;
