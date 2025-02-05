import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { RenderCell } from "./render-cell";

interface TableProps {
  columns: { name: string; uid: string }[];
  data: any[];
  handleViewDetails: (adId: string) => void;
  handleVisitAd: (adId: string) => void;
  handleMarkComplete?: (adId: string, reported: boolean) => void;
}

export const AdsTable: React.FC<TableProps> = ({
  columns,
  data,
  handleViewDetails,
  handleVisitAd,
  handleMarkComplete,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Ads Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={[
                "visit_ad",
                "full_details",
                "mark_complete",
              ].includes(column.uid)}
              align={
                ["visit_ad", "full_details", "mark_complete"].includes(
                  column.uid
                )
                  ? "center"
                  : "start"
              }
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow
              key={item?.id || item?.ad_id || item?._id || Math.random()}
            >
              {(columnKey) => (
                <TableCell>
                  <RenderCell
                    item={item}
                    columnKey={columnKey}
                    handleViewDetails={handleViewDetails}
                    handleVisitAd={handleVisitAd}
                    handleMarkComplete={handleMarkComplete}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
