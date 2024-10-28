// components/Search.tsx
import { useRef, useEffect } from "react";
import { useCities } from "../../context/CitiesContext";

import Loading from "../Loading";
import Table from "../Table/Table";
import TableItemsPerPage from "../Table/TableItemsPerPage";
import PaginationControls from "../Table/TablePaginationControls";
import SearchIcon from "../../assets/Search.svg";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";
import useSort from "../../hooks/useSort";

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

const Search = () => {
  const { cities, loading, error } = useCities();
  const { searchTerm, handleInputChange, filteredItems } = useSearch(cities);
  const { sortedData, handleSort, sortConfig } = useSort(filteredItems);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination(sortedData, ITEMS_PER_PAGE_OPTIONS);

  const errorRef = useRef<HTMLParagraphElement | null>(null);

  // Announce errors without shifting focus
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.setAttribute("aria-live", "assertive");
    }
  }, [error]);

  return (
    <main role="main">
      <header className="mb-4" role="banner">
        <form
          onSubmit={(e) => e.preventDefault()}
          role="search"
          aria-label="City and country search"
          className="relative"
        >
          <label htmlFor="search" className="sr-only">
            Search for a city or country
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <img
                src={SearchIcon}
                alt="Search"
                className="w-5 h-5 text-gray-500"
              />
            </div>
            <input
              id="search"
              type="search"
              placeholder="Search for a city or country..."
              value={searchTerm}
              onChange={handleInputChange}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              aria-label="Search field"
              autoFocus
            />
          </div>
        </form>
      </header>

      <section aria-live="polite" className="mt-2 text-center" tabIndex={0}>
        {searchTerm && <p>Showing results for "{searchTerm}"</p>}
      </section>

      {loading ? (
        <section role="status" className="flex items-center justify-center">
          <Loading />
        </section>
      ) : error ? (
        <section aria-live="assertive" className="text-center">
          <p
            ref={errorRef}
            className="text-red-500"
            tabIndex={-1}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        </section>
      ) : paginatedItems.length > 0 ? (
        <>
          <article className="table-container">
            <Table
              aria-label="City data"
              cities={paginatedItems}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          </article>
          <footer className="flex flex-col gap-4 mt-12 items-center sm:flex-row sm:justify-between sm:gap-8">
            <TableItemsPerPage
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              options={ITEMS_PER_PAGE_OPTIONS}
            />
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          </footer>
        </>
      ) : (
        <p
          className="text-center text-red-500 pt-4"
          aria-live="assertive"
          role="alert"
          tabIndex={-1}
        >
          No cities found.
        </p>
      )}
    </main>
  );
};

export default Search;
