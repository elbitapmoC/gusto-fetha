// src/components/ui/Search.tsx
import React, { useState, useEffect } from "react";
import SearchIcon from "../icons/Search";

interface SearchProps {
  value: string; // Controlled value from parent
  onSearch: (query: string) => void; // Callback to update search query
}

const Search = ({ value, onSearch }: SearchProps) => {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value); // Sync local state with parent value
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Pass the new query to parent
  };

  return (
    <form role="search" aria-label="City and country search">
      <label htmlFor="search" className="sr-only">
        Search for a city or country
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          id="search"
          type="search"
          placeholder="Search for a city or country..."
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          onChange={handleChange}
          aria-label="Search field"
          value={query}
        />
      </div>
    </form>
  );
};

export default Search;
