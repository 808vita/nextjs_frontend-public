import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

import { useState } from "react";
import { RenderCell } from "./render-cell";

interface TableProps {
  columns: { name: string; uid: string }[];
  data: any[];
}

export const TableWrapper: React.FC<TableProps> = ({ columns, data }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data, rowsPerPage]);
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <RenderCell item={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        total={pages}
        initialPage={1}
        onChange={(page) => setPage(page)}
        page={page}
      />
    </div>
  );
};
