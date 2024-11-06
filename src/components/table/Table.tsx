// src/components/table/Table.tsx

import { TableProps } from "../../types";

const Table = ({ children, sortConfig, onSort }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse" role="table">
        {children}
      </table>
    </div>
  );
};

export default Table;
