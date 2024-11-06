// src/presentation/components/Table/TableColumnHeader.tsx

import React from "react";
import { TableProps, City } from "./TableTypes";

const mapDirectionToAriaSort = (
  direction: "asc" | "desc" | "none"
): "ascending" | "descending" | "none" => {
  switch (direction) {
    case "asc":
      return "ascending";
    case "desc":
      return "descending";
    default:
      return "none";
  }
};

const getSortIndicator = (
  column: keyof City,
  sortConfig: TableProps["sortConfig"]
) => {
  if (sortConfig.column === column) {
    return sortConfig.direction === "asc" ? "↑" : "↓";
  }
  return "⇅";
};

interface TableColumnHeaderProps {
  label: string;
  keyProp: keyof City;
  onSort: (column: keyof City) => void;
  sortConfig: TableProps["sortConfig"];
}

const TableColumnHeader: React.FC<TableColumnHeaderProps> = ({
  label,
  keyProp,
  onSort,
  sortConfig,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSort(keyProp);
    }
  };

  return (
    <th
      onClick={() => onSort(keyProp)}
      onKeyDown={handleKeyPress}
      className="cursor-pointer hover:bg-gray-100 p-4 border"
      tabIndex={0}
      role="columnheader"
      scope="col"
      aria-sort={
        sortConfig.column === keyProp
          ? mapDirectionToAriaSort(sortConfig.direction)
          : "none"
      }
    >
      {label} {getSortIndicator(keyProp, sortConfig)}
    </th>
  );
};

export default React.memo(TableColumnHeader);
