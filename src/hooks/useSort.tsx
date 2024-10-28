// hooks/useSort.tsx
import { useState, useMemo } from "react";
import type { City } from "../api/getCities";

type SortDirection = "asc" | "desc" | "none";

export default function useSort(data: City[]) {
  const [sortConfig, setSortConfig] = useState<{
    column: keyof City | null;
    direction: SortDirection;
  }>({
    column: null,
    direction: "none",
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.column || sortConfig.direction === "none") return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.column!] as string | number;
      const bValue = b[sortConfig.column!] as string | number;
      const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const handleSort = (column: keyof City) => {
    setSortConfig((prev) => {
      let newDirection: SortDirection;

      if (prev.column === column) {
        newDirection =
          prev.direction === "asc"
            ? "desc"
            : prev.direction === "desc"
            ? "none"
            : "asc";
      } else {
        newDirection = "asc";
      }

      return { column, direction: newDirection };
    });
  };

  return { sortedData, handleSort, sortConfig };
}
