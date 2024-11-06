// src/presentation/components/Table/PaginationControls.tsx

import lastPageIcon from "../../assets/LastPage.svg";
import firstPageIcon from "../../assets/FirstPage.svg";

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
    className="flex gap-2 items-center justify-center"
  >
    {/* First Page Button */}
    <button
      onClick={() => onPageChange(1)}
      disabled={isLoading || currentPage === 1}
      aria-label="First Page"
      className="flex items-center justify-center rounded disabled:opacity-50"
    >
      <img className="w-4 h-4" src={firstPageIcon} alt="First page" />
    </button>

    {/* Previous Page Button */}
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={isLoading || currentPage === 1}
      aria-label="Previous Page"
      className="w-10 h-8 flex items-center justify-center rounded disabled:opacity-50"
    >
      &#8592;
    </button>

    {/* Current Page Display */}
    <span aria-current="page" className="text-center">
      Page {currentPage} of {totalPages}
    </span>

    {/* Next Page Button */}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={isLoading || currentPage === totalPages}
      aria-label="Next Page"
      className="w-10 h-8 flex items-center justify-center rounded disabled:opacity-50"
    >
      &#8594;
    </button>

    {/* Last Page Button */}
    <button
      onClick={() => onPageChange(totalPages)}
      disabled={isLoading || currentPage === totalPages}
      aria-label="Last Page"
      className="flex items-center justify-center rounded disabled:opacity-50"
    >
      <img className="w-4 h-4" src={lastPageIcon} alt="Last page" />
    </button>
  </nav>
);

export default PaginationControls;
