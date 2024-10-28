import { TableProps } from "./Table";
import type { City } from "../../api/getCities";

const mapDirectionToAriaSort = (direction: "asc" | "desc" | "none") => {
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
    if (sortConfig.direction === "asc") return "↑";
    if (sortConfig.direction === "desc") return "↓";
  }
  return "⇅"; // No symbol when sort direction is "none"
};

const TableColumnHeader = ({
  label,
  keyProp,
  onSort,
  sortConfig,
}: {
  label: string;
  keyProp: keyof City;
  onSort: (column: keyof City) => void;
  sortConfig: TableProps["sortConfig"];
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Prevent page scroll on Space key
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

export default TableColumnHeader;
