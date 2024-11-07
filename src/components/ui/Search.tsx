// src/components/ui/Search.tsx
import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="max-w-lg mx-auto">
      <input
        type="text"
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
