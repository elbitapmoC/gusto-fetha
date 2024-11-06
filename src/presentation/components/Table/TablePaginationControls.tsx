import lastPageIcon from "../../assets/LastPage.svg";
import firstPageIcon from "../../assets/FirstPage.svg";

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}) => (
  <nav
    aria-label="Pagination"
    aria-live="polite"
    className="flex gap-2 items-center justify-center"
  >
    <button
      onClick={() => onPageChange(1)}
      disabled={isLoading || currentPage === 1}
      aria-label="First Page"
      className="flex items-center justify-center rounded disabled:opacity-50"
      tabIndex={0}
    >
      <img
        className="fixed-image"
        src={firstPageIcon}
        alt="Navigate to first page"
      />
    </button>

    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={isLoading || currentPage === 1}
      aria-label="Previous Page"
      className="w-10 h-8 flex items-center justify-center rounded text-white disabled:opacity-50"
      tabIndex={0}
    >
      &#8592;
    </button>

    <span aria-current="page" className="text-center">
      Pg. {currentPage} / {totalPages}
    </span>

    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={isLoading || currentPage === totalPages}
      aria-label="Next Page"
      className="w-10 h-8 flex items-center justify-center rounded text-white disabled:opacity-50"
      tabIndex={0}
    >
      &#8594;
    </button>

    <button
      onClick={() => onPageChange(totalPages)}
      disabled={isLoading || currentPage === totalPages}
      aria-label="Last Page"
      className="flex items-center justify-center rounded disabled:opacity-50"
      tabIndex={0}
    >
      <img
        className="fixed-image"
        src={lastPageIcon}
        alt="Navigate to last page"
      />
    </button>
  </nav>
);

export default PaginationControls;
