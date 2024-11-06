// src/presentation/hooks/usePagination.tsx

import { useState } from "react";

const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page: number) => {
    const pageNum = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(pageNum);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  return {
    currentPage,
    totalPages,
    goToPage,
    startIdx,
    endIdx,
  };
};

export default usePagination;
