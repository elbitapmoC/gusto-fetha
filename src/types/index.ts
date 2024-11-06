// src/presentation/components/Table/TableTypes.ts

import { City } from "../../app/domain/models/City";

export interface SortConfig {
  column: keyof City;
  direction: "asc" | "desc" | "none";
}

export interface TableProps {
  sortConfig: SortConfig | null; // Allowing null to accommodate initial state
  onSort: (column: keyof City) => void;
  children: React.ReactNode;
}

export type { City }; // Re-export City for use in Table components
