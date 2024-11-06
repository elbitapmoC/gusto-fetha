// src/presentation/components/Table/TableColumnHeader.tsx

import React from "react";
import { TableProps, City } from "../../types/index";

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
      onSort(keyProp);
    }
  };

  const isSorted = sortConfig?.column === keyProp;
  const sortDirection = isSorted ? sortConfig.direction : "none";

  return (
    <th
      onClick={() => onSort(keyProp)}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="columnheader"
      aria-sort={sortDirection === "asc" ? "ascending" : "descending"}
      className="cursor-pointer hover:bg-gray-100 p-4 border"
    >
      {label}{" "}
      {sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "⇅"}
    </th>
  );
};

export default React.memo(TableColumnHeader);
