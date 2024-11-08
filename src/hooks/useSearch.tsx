// src/presentation/hooks/useSearch.tsx

import { useState, useMemo } from "react";
import { useCities } from "../context/CitiesContext"; // Access data from context
import { City } from "../types";

// src/hooks/useSearch.tsx
interface UseSearchProps {
  items: City[]; // Ensure `items` is defined
  searchField: keyof City;
}

const useSearch = ({ searchField }: UseSearchProps) => {
  const { cities } = useCities(); // Get cities data from context
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return cities.filter((item) =>
      String(item[searchField]).toLowerCase().includes(lowerCaseTerm)
    );
  }, [cities, searchTerm, searchField]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
};

export default useSearch;
