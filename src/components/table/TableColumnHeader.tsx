// src/components/table/TableColumnHeader.tsx

import { SortConfig, City } from "../../types";

interface TableColumnHeaderProps {
  label: string;
  keyProp: keyof City;
  onSort: (column: keyof City) => void;
  sortConfig: SortConfig | null;
}

// Helper function to get sort indicator
const getSortIndicator = (
  column: keyof City,
  sortConfig: SortConfig | null
) => {
  if (sortConfig?.column === column) {
    if (sortConfig.direction === "ascending") return "↑";
    if (sortConfig.direction === "descending") return "↓";
  }
  return "⇅"; // Default symbol when no specific sort is applied
};

const TableColumnHeader = ({
  label,
  keyProp,
  onSort,
  sortConfig,
}: TableColumnHeaderProps) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onSort(keyProp);
    }
  };

  const handleClick = () => {
    onSort(keyProp);
  };

  return (
    <th
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="columnheader"
      aria-sort={sortConfig?.column === keyProp ? sortConfig.direction : "none"}
      className="cursor-pointer hover:bg-gray-100 p-4 border"
    >
      {label} {getSortIndicator(keyProp, sortConfig)}
    </th>
  );
};

export default TableColumnHeader;
