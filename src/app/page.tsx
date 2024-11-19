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
import { City } from "@/types";
import Visualization from "@/components/Visualization";

export default function HomePage() {
  const { cities, loading, error, itemsPerPage } = useCities(); // Access itemsPerPage from context

  const {
    searchTerm,
    setSearchTerm,
    filteredItems: searchedCities,
    isSearching,
  } = useSearch({
    items: cities,
    searchFields: ["name", "country"], // Search by both city name and country
  });

  const { sortedCities, requestSort, sortConfig } = useSort(searchedCities);

  const {
    paginatedItems: paginatedCities,
    currentPage,
    totalPages,
    handlePageChange,
  } = usePagination<City>({ items: sortedCities, itemsPerPage }); // Use itemsPerPage from context

  return (
    <main>
      <Title title="City Directory" />
      <div className="mb-4 relative max-w-xl mx-auto">
        <Search value={searchTerm} onSearch={setSearchTerm} />
      </div>
      {searchTerm.length > 0 && (
        <section aria-live="polite" className="mt-2 text-center" tabIndex={0}>
          <p>Showing results for &quot;{searchTerm}&quot;</p>
        </section>
      )}

      {loading || isSearching ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <Table
            data={paginatedCities}
            sortConfig={sortConfig || ""}
            onSort={requestSort}
          />

          <footer className="max-w-xl mx-auto flex flex-col gap-4 mt-12 items-center sm:flex-row sm:justify-between sm:gap-8">
            <TableItemsPerPage />
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          </footer>

          {/* Pass only the paginatedCities to Visualization */}
          <Visualization cities={paginatedCities} />
        </>
      )}
    </main>
  );
}
