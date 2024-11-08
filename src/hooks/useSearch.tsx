// src/hooks/useSearch.tsx

import { useState, useMemo, useEffect } from "react";
import { City } from "../types";

interface UseSearchProps {
  items: City[];
  searchFields: (keyof City)[];
}

const useSearch = ({ items, searchFields }: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);

  // Update `debouncedSearchTerm` only after 150ms of inactivity
  useEffect(() => {
    setIsSearching(true);

    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // Update only after delay
      setIsSearching(false);
    }, 150);

    // Clear timeout if searchTerm changes within the delay
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Filter items based on the debounced search term
  const filteredItems = useMemo(() => {
    const lowerCaseTerm = debouncedSearchTerm.toLowerCase();
    return items.filter((item) =>
      searchFields.some((field) =>
        String(item[field]).toLowerCase().includes(lowerCaseTerm)
      )
    );
  }, [items, debouncedSearchTerm, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    isSearching, // Track if debounce is in progress
  };
};

export default useSearch;
