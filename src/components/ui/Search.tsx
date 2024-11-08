// src/components/ui/Search.tsx
import Image from "next/image";
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
    <form
      role="search"
      aria-label="City and country search"
      className="relative max-w-xl mx-auto"
    >
      <label htmlFor="search" className="sr-only">
        Search for a city or country
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Image
            src="/assets/search.svg"
            alt="Search"
            width={21}
            height={21}
            role="img"
          />
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
