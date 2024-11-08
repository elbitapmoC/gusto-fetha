// src/types/index.ts

export interface City {
  id: number;
  name: string;
  nameAscii?: string;
  country: string;
  countryIso3?: string;
  capital: string;
  population: number;
}

export interface CityServiceInterface {
  getCities(
    limit?: number,
    offset?: number,
    searchTerm?: string
  ): Promise<City[]>;
}

// Sorting configuration for a table column
export interface SortConfig {
  column: keyof City;
  direction: "ascending" | "descending" | "none";
}

// General props for tables, includes data
export interface TableProps {
  data: City[];
  sortConfig: SortConfig | "";
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
