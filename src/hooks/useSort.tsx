// src/presentation/hooks/useSort.tsx

import { useState, useMemo } from "react";
import { City } from "../domain/models/City";

const useSort = (cities: City[]) => {
  const [sortConfig, setSortConfig] = useState<{
    column: keyof City;
    direction: "asc" | "desc";
  }>({
    column: "name", // Default column to sort by
    direction: "asc", // Default direction
  });

  const sortedCities = useMemo(() => {
    return [...cities].sort((a, b) => {
      const aValue = a[sortConfig.column] ?? "";
      const bValue = b[sortConfig.column] ?? "";

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [cities, sortConfig]);

  const requestSort = (column: keyof City) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.column === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ column, direction });
  };

  return { sortedCities, requestSort, sortConfig };
};

export default useSort;
