// usePagination.tsx
import { useState, useMemo } from "react";

const usePagination = (
  items: any[], // List of items to paginate
  itemsPerPageOptions: number[] // Options for items per page
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]); // Default to the first option

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
  };
};

export default usePagination;
