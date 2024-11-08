// src/components/ui/Search.tsx
import { useState, useEffect } from "react";

interface SearchProps {
  value: string; // Renamed for clarity as a controlled component
  onSearch: (query: string) => void;
}

const Search = ({ value, onSearch }: SearchProps) => {
  const [query, setQuery] = useState(value);

  // Syncs local query state with prop value changes from the parent
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Handles input change and sends updates to parent on each keystroke
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Directly calls onSearch with updated query
  };

  return (
    <div className="max-w-xl mx-auto">
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Search cities..."
        className="text-sm p-2 border bg-[var(--background-color)] text-[var(--text-color-primary)] placeholder:text-[var(--text-color-secondary)] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        aria-label="Search cities"
      />
    </div>
  );
};

export default Search;
