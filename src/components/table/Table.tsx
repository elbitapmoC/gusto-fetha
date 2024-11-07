// src/components/table/Table.tsx

import { TableProps } from "../../types";

const Table = ({ children }: TableProps) => {
  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full text-left border-collapse">{children}</table>
    </div>
  );
};

export default Table;
