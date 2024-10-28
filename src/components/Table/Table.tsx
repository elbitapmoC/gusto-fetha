// components/Table/Table.tsx
import TableColumnHeader from "./TableColumnHeader";
import { City } from "../../api/getCities";
import { memo } from "react";

export interface TableProps {
  cities: City[];
  onSort: (column: keyof City) => void;
  sortConfig: {
    column: keyof City | null;
    direction: "asc" | "desc" | "none";
  };
}

const Table = memo(({ cities, onSort, sortConfig }: TableProps) => {
  const columns: { label: string; key: keyof City }[] = [
    { label: "City", key: "name" },
    { label: "Country", key: "country" },
    { label: "Population", key: "population" },
    { label: "Capital", key: "capital" },
  ];

  return (
    <table className="table-auto w-full text-sm border-collapse" role="table">
      <caption className="sr-only">City information table</caption>
      <thead style={{ backgroundColor: "var(--header-bg)" }}>
        <tr>
          {columns.map(({ label, key }) => (
            <TableColumnHeader
              key={key as string}
              label={label}
              keyProp={key}
              onSort={onSort}
              sortConfig={sortConfig}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {cities.map((city) => (
          <tr key={city.id} role="row">
            <td className="p-4 border-b">{city.name}</td>
            <td className="p-4 border-b">{city.country}</td>
            <td className="p-4 border-b">{city.population.toLocaleString()}</td>
            <td className="p-4 border-b">{city.capital || "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default Table;
