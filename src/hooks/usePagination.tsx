// src/hooks/usePagination.tsx

import { useState, useMemo, Dispatch, SetStateAction } from "react";

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
}

const usePagination = <T,>({
  items,
  itemsPerPage: initialItemsPerPage,
}: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return items.slice(startIdx, endIdx);
  }, [items, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    paginatedItems,
    currentPage,
    totalPages,
    itemsPerPage, // Add this line to return itemsPerPage
    setItemsPerPage,
    handlePageChange,
  };
};

export default usePagination;
