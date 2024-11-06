"use client";

// src/app/page.tsx

import { useState, useMemo } from "react";
import { useCities } from "../context/CitiesContext";
import Table from "../components/table/Table";
import PaginationControls from "../components/table/PaginationControls";
import TableItemsPerPage from "../components/table/TableItemsPerPage";
import Search from "../components/ui/Search";

export default function HomePage() {
  const { cities, loading, error } = useCities();
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle search term updates
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Memoize filtered cities to prevent unnecessary recalculations
  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Slice filtered data for the current page
  const paginatedCities = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return filteredCities.slice(startIdx, endIdx);
  }, [filteredCities, currentPage, itemsPerPage]);

  return (
    <main>
      <h1 className="text-4xl font-bold text-center mb-6">City Directory</h1>

      <div className="mb-4">
        <Search onSearch={handleSearch} />
      </div>

      {loading ? (
        <p className="text-center">Loading cities...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <Table data={paginatedCities} />
          <div className="flex justify-between items-center mt-6">
            <TableItemsPerPage
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          </div>
        </>
      )}
    </main>
  );
}
