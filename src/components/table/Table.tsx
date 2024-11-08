// src/components/table/Table.tsx

import { TableProps, SortConfig } from "../../types";
import TableColumnHeader from "./TableColumnHeader";

const Table = ({ data, sortConfig, onSort }: TableProps) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-red-500 p-4">No cities found.</p>;
  }

  // Ensure `handleSort` has a fallback function if `onSort` is undefined
  const handleSort = onSort ?? (() => {});

  // Use the provided `sortConfig` or fall back to a default
  const activeSortConfig: SortConfig = sortConfig || {
    column: "name",
    direction: "none",
  };

  return (
    <div className="table-container overflow-x-auto max-w-xl m-auto">
      <table
        className="w-full text-left border-collapse table-auto text-sm"
        role="table"
        aria-label="City Directory"
      >
        <thead>
          <tr>
            {/* Table headers with sorting functionality */}
            <TableColumnHeader
              label="Name"
              keyProp="name"
              onSort={handleSort}
              sortConfig={activeSortConfig}
            />
            <TableColumnHeader
              label="Country"
              keyProp="country"
              onSort={handleSort}
              sortConfig={activeSortConfig}
            />
            <TableColumnHeader
              label="Population"
              keyProp="population"
              onSort={handleSort}
              sortConfig={activeSortConfig}
            />
            <TableColumnHeader
              label="Capital"
              keyProp="capital"
              onSort={handleSort}
              sortConfig={activeSortConfig}
            />
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, capital, country, name, population }, idx) => (
            <tr
              key={id || idx}
              className="hover:bg-[var(--primary-surface)] even:bg-gray-50"
            >
              <td className="p-4 border-b" role="cell">
                {name}
              </td>
              <td className="p-4 border-b" role="cell">
                {country}
              </td>
              <td className="p-4 border-b" role="cell">
                {population ? population.toLocaleString() : "0"}
              </td>
              <td className="p-4 border-b" role="cell">
                {capital ? capital : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
