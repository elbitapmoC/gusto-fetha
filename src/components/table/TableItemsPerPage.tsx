// src/components/table/TableItemsPerPage.tsx

interface TableItemsPerPageProps {
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}

const TableItemsPerPage = ({
  itemsPerPage,
  setItemsPerPage,
}: TableItemsPerPageProps) => {
  return (
    <label className="flex items-center space-x-2">
      <span className="text-sm">Items per page:</span>
      <select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        aria-label="Items per page"
        className="border p-2 rounded-md"
      >
        {[10, 20, 50, 100].map((count) => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select>
    </label>
  );
};

export default TableItemsPerPage;
