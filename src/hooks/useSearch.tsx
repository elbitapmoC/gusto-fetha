// src/presentation/hooks/useSearch.tsx

import { useState, useMemo } from "react";
import { City } from "../domain/models/City";

interface UseSearchProps {
  items: City[];
  searchField: keyof City;
}

const useSearch = ({ items, searchField }: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return items.filter((item) =>
      String(item[searchField]).toLowerCase().includes(lowerCaseTerm)
    );
  }, [items, searchTerm, searchField]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
};

export default useSearch;
