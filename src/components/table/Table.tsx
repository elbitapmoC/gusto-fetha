// src/presentation/components/Table/Table.tsx

import { TableProps } from "./TableTypes";

const Table = ({ children }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">{children}</table>
    </div>
  );
};

export default Table;
