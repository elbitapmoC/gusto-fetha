// src/types/index.ts

// --------------- Table Types ---------------
import { City } from "../domain/models/City";

export interface SortConfig {
  column: keyof City;
  direction: "asc" | "desc" | "none";
}

export interface TableProps {
  data: City[];
  sortConfig: SortConfig | null;
  onSort: (column: keyof City) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
}

// --------------- Other Types ---------------
// Add additional type definitions here as needed
// e.g., types for different components or domains
