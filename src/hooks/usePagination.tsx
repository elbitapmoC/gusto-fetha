import { useState, useMemo } from "react";

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
}

const usePagination = <T,>({ items, itemsPerPage }: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return items.slice(startIdx, endIdx);
  }, [items, currentPage, itemsPerPage]); // Ensure itemsPerPage is included here

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset current page when itemsPerPage changes
  useMemo(() => {
    setCurrentPage(1); // Go back to the first page when itemsPerPage changes
  }, [itemsPerPage]);

  return {
    paginatedItems,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default usePagination;
