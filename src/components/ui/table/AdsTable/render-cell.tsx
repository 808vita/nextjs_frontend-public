import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { EyeIcon } from "@/components/components/icons/table/eye-icon";
import { EditIcon } from "@/components/components/icons/table/edit-icon";

interface Props {
  item: any;
  columnKey: string | React.Key;
  handleViewDetails: (adId: string) => void;
  handleVisitAd: (adId: string) => void;
  handleMarkComplete?: (adId: string, reported: boolean) => void;
}
export const RenderCell: React.FC<Props> = ({
  item,
  columnKey,
  handleViewDetails,
  handleVisitAd,
  handleMarkComplete,
}) => {
  // @ts-ignore
  const cellValue = item[columnKey];

  switch (columnKey) {
    case "id":
      return <span>{cellValue}</span>;
    case "ad_id":
      return <span>{cellValue}</span>;
    case "report_reason":
      return <span>{cellValue}</span>;
    case "created_at":
      return <span>{cellValue}</span>;
    case "reported":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={cellValue === true ? "success" : "danger"}
        >
          {String(cellValue)}
        </Chip>
      );
    case "publisher_platforms":
      return (
        <div>
          {Array.isArray(cellValue) &&
            cellValue.map((platform: string, key: any) => (
              <span key={key}>{platform} , </span>
            ))}
        </div>
      );

    case "visit_ad":
      return (
        <Tooltip content="Visit Ad" color="secondary">
          <button onClick={() => handleVisitAd(item.ad_id)}>Visit Ad</button>
        </Tooltip>
      );
    case "full_details":
      return (
        <Tooltip content="View Details" color="secondary">
          <button onClick={() => handleViewDetails(item.ad_id)}>
            <EyeIcon size={20} fill="#979797" />
          </button>
        </Tooltip>
      );
    case "mark_complete":
      return (
        <Tooltip content="Mark Complete" color="success">
          <button
            onClick={() => handleMarkComplete?.(item.ad_id, item.reported)}
          >
            <EditIcon size={20} fill="green" />
          </button>
        </Tooltip>
      );
    default:
      return cellValue;
  }
};
