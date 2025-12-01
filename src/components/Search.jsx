"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  // Local state for the input field
  const [query, setQuery] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (query.trim() !== "") {
      onSearch(query); // pass query back to parent
    }
  };

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
    </div>
  );
}
