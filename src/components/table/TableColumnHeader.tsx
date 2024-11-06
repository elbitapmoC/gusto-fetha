// src/components/table/TableColumnHeader.tsx

import { SortConfig } from "../../types";
import { City } from "../../domain/models/City";

interface TableColumnHeaderProps {
  label: string;
  keyProp: keyof City;
  onSort: (column: keyof City) => void;
  sortConfig: SortConfig;
}

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

  const isSorted = sortConfig?.column === keyProp;
  const sortIndicator = isSorted
    ? sortConfig.direction === "asc"
      ? "↑"
      : "↓"
    : "⇅";

  return (
    <th
      onClick={() => onSort(keyProp)}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="columnheader"
      aria-sort={
        isSorted
          ? sortConfig.direction === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
      className="cursor-pointer hover:bg-gray-100 p-4 border"
    >
      {label} {sortIndicator}
    </th>
  );
};

export default TableColumnHeader;
