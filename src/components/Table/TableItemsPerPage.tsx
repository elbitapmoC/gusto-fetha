import { ChangeEvent } from "react";

interface TableItemsPerPageProps {
  value: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: number[];
}

const TableItemsPerPage = ({
  value,
  onChange,
  options,
}: TableItemsPerPageProps) => (
  <aside className="items-per-page-selector">
    <label htmlFor="itemsPerPage" className="mr-2">
      Items per page:
    </label>
    <select
      id="itemsPerPage"
      value={value}
      onChange={onChange}
      className="p-2 rounded"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </aside>
);

export default TableItemsPerPage;
