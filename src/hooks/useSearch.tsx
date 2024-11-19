// src/hooks/useSearch.tsx
import { useState, useMemo, useEffect } from "react";
import { City } from "@/types";

interface UseSearchProps {
  items: City[];
  searchFields: (keyof City)[];
}

const useSearch = ({ items, searchFields }: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search term
  useEffect(() => {
    setIsSearching(true);
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, 150);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filter items based on the debounced search term
  const filteredItems = useMemo(() => {
    const lowerCaseTerm = debouncedSearchTerm.toLowerCase();
    return items.filter((item) =>
      searchFields.some((field) =>
        String(item[field] ?? "")
          .toLowerCase()
          .includes(lowerCaseTerm)
      )
    );
  }, [items, debouncedSearchTerm, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    isSearching,
  };
};

export default useSearch;
