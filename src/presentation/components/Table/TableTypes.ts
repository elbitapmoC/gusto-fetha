// src/presentation/components/Table/TableTypes.ts

import { City } from "domain/models/City";

export interface SortConfig {
  column: keyof City;
  direction: "asc" | "desc" | "none";
}

export interface TableProps {
  sortConfig: SortConfig;
  onSort: (column: keyof City) => void;
  children: React.ReactNode;
}

export type { City }; // Re-export City for use in Table components
