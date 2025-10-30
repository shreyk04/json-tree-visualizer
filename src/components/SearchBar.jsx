import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query.trim());
    };

    return (
        <div className="flex gap-2 items-center mb-4">
            <input
                type="text"
                placeholder="Search by JSON path (e.g., $.user.name)"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                onClick={handleSearch}
                className="bg-green-600 text-white  cursor-pointer px-4 py-2 rounded-md hover:bg-green-700"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
