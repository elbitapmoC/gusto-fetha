// src/components/table/PaginationControls.tsx

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: PaginationProps) => (
  <nav
    aria-label="Pagination"
    className="flex gap-2 items-center justify-center mt-4"
  >
    {/* First Page Button */}
    <button
      onClick={() => onPageChange(1)}
      disabled={isLoading || currentPage === 1}
      aria-label="First Page"
      className="min-w-[40px] min-h-[32px] bg-[var(--primary-light)] text-[var(--primary-color)] rounded-md hover:bg-[var(--primary-surface)] disabled:opacity-50 transition-colors p-2"
    >
      First
    </button>

    {/* Previous Page Button */}
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={isLoading || currentPage === 1}
      aria-label="Previous Page"
      className="min-w-[40px] min-h-[32px] bg-[var(--primary-light)] text-[var(--primary-color)] rounded-md hover:bg-[var(--primary-surface)] disabled:opacity-50 transition-colors p-2"
    >
      Previous
    </button>

    {/* Current Page Display */}
    <span
      aria-current="page"
      className="text-center font-semibold text-[var(--text-color-primary)]"
    >
      Page {currentPage} of {totalPages}
    </span>

    {/* Next Page Button */}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={isLoading || currentPage === totalPages}
      aria-label="Next Page"
      className="min-w-[40px] min-h-[32px] bg-[var(--primary-light)] text-[var(--primary-color)] rounded-md hover:bg-[var(--primary-surface)] disabled:opacity-50 transition-colors p-2"
    >
      Next
    </button>

    {/* Last Page Button */}
    <button
      onClick={() => onPageChange(totalPages)}
      disabled={isLoading || currentPage === totalPages}
      aria-label="Last Page"
      className="min-w-[40px] min-h-[32px] bg-[var(--primary-light)] text-[var(--primary-color)] rounded-md hover:bg-[var(--primary-surface)] disabled:opacity-50 transition-colors p-2"
    >
      Last
    </button>
  </nav>
);

export default PaginationControls;
