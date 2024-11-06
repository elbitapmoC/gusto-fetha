// src/types/index.ts

import { City } from "../domain/models/City";

// Sorting configuration for a table column
export interface SortConfig {
  column: keyof City;
  direction: "asc" | "desc" | "none";
}

// General props for tables, includes data
export interface TableProps {
  children?: React.ReactNode;
  sortConfig: SortConfig | null;
  onSort: (column: keyof City) => void;
}

// Pagination props
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
}

export type { City };
