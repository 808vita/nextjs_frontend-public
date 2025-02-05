import React from "react";
import { Button } from "@nextui-org/react";
import { ExportIcon } from "@/components/components/icons/accounts/export-icon";

interface ExportButtonProps {
  handleExport: () => void;
}
export const ExportButton: React.FC<ExportButtonProps> = ({ handleExport }) => {
  return (
    <Button
      startContent={<ExportIcon />}
      color="primary"
      onClick={handleExport}
    >
      Export as CSV
    </Button>
  );
};
