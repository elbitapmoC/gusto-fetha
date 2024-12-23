"use client";

import { useCities } from "@/context/CitiesContext";

const TableItemsPerPage = () => {
  const { itemsPerPage, setItemsPerPage } = useCities();

  return (
    <label className="flex items-center space-x-2">
      <span className="text-sm">Items per page:</span>
      <select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        aria-label="Items per page"
        className="border p-2 rounded-md"
      >
        {[5, 10, 15].map((count) => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select>
    </label>
  );
};

export default TableItemsPerPage;
