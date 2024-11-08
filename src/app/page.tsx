// src/app/page.tsx
"use client";

import { useCities } from "../context/CitiesContext";
import Table from "../components/table/Table";
import PaginationControls from "../components/table/PaginationControls";
import TableItemsPerPage from "../components/table/TableItemsPerPage";
import Search from "../components/ui/Search";
import Title from "@/components/ui/Title";
import Loading from "@/components/ui/Loading";
import useSearch from "../hooks/useSearch";
import useSort from "../hooks/useSort";
import usePagination from "../hooks/usePagination";

export default function HomePage() {
  // Fetch cities from context
  const { cities, loading, error } = useCities();

  // Initialize search
  const {
    searchTerm,
    setSearchTerm,
    filteredItems: searchedCities,
  } = useSearch({
    items: cities,
    searchField: "name",
  });

  // Initialize sorting on searched cities
  const { sortedCities, requestSort, sortConfig } = useSort(searchedCities);

  // Initialize pagination on sorted cities
  const {
    paginatedItems: paginatedCities,
    currentPage,
    totalPages,
    itemsPerPage, // Now it’s available here
    setItemsPerPage,
    handlePageChange,
  } = usePagination<City>({ items: sortedCities, itemsPerPage: 10 });

  return (
    <main>
      <Title title="City Directory" />

      <div className="mb-4">
        <Search value={searchTerm} onSearch={setSearchTerm} />
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <Table
            data={paginatedCities}
            sortConfig={sortConfig}
            onSort={requestSort}
          />

          <footer className="max-w-xl mx-auto flex flex-col gap-4 mt-12 items-center sm:flex-row sm:justify-between sm:gap-8">
            <TableItemsPerPage
              itemsPerPage={itemsPerPage} // Use the value directly here
              setItemsPerPage={setItemsPerPage}
            />
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          </footer>
        </>
      )}
    </main>
  );
}
