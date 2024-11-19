// src/hooks/useSort.tsx

import { useState, useMemo } from "react";
import { SortConfig, City } from "../types";

const useSort = (cities: City[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({
    column: "name", // Default column to sort by
    direction: "none", // Start with no sorting
  });

  const sortedCities = useMemo(() => {
    if (!sortConfig || sortConfig.direction === "none") return cities;

    return [...cities].sort((a, b) => {
      const aValue = a[sortConfig.column] ?? "";
      const bValue = b[sortConfig.column] ?? "";

      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [cities, sortConfig]);

  const requestSort = (column: keyof City) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig?.column === column) {
        if (prevSortConfig.direction === "ascending") {
          return { column, direction: "descending" };
        } else if (prevSortConfig.direction === "descending") {
          return { column, direction: "none" };
        }
      }
      // Start with ascending if sorting a new column or resetting to ascending
      return { column, direction: "ascending" };
    });
  };

  return { sortedCities, requestSort, sortConfig };
};

export default useSort;
