import React, { useState, useCallback, useMemo } from "react";
import { Button, Input, Switch, Pagination, Tooltip } from "@nextui-org/react";

import { AdsTable } from "@/components/ui/table/AdsTable/AdsTable";
import { ConfirmActionModal } from "./ConfirmActionModal";
import { AdDetailsModal } from "./AdDetailsModal";
import { ExportButton } from "./ExportButton";
import { useDisclosure } from "@nextui-org/react";
import { EyeIcon } from "@/components/components/icons/table/eye-icon";
import { EditIcon } from "@/components/components/icons/table/edit-icon";
import { useReportedAds } from "./utils";
import Toast from "@/components/ui/Toast";

interface ReportedAd {
  id: string;
  ad_id: string;
  report_reason: string;
  reported: boolean;
  created_at: string;
  updated_at: string;
}
interface Column {
  name: string;
  uid: keyof ReportedAd | "visit_ad" | "full_details" | "mark_complete";
}
const columns: Column[] = [
  { name: "Ad ID", uid: "ad_id" },
  //   { name: "Reason", uid: "report_reason" },
  { name: "Reported", uid: "reported" },
  { name: "Created At", uid: "created_at" },
  { name: "Visit Ad", uid: "visit_ad" },
//   { name: "Full Details", uid: "full_details" },
  { name: "Mark Complete", uid: "mark_complete" },
];
const ReportedAdsList: React.FC = () => {
  const {
    ads,
    loading,
    error,
    isPending,
    setPending,
    handleViewDetails: handleFetchAdDetails,
    handleReportAd,
    fetchAds,
    pages,
    handlePageChange,
    page,
    searchTerm,
    setSearchTerm,
    handleOpenConfirmModal,
    deleteConfirmation,
    handleConfirmDelete,
    handleExport,
    toastProps,
    handleCloseToast,
  } = useReportedAds();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAdId, setSelectedAdId] = useState<string | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleToggle = () => {
    setPending(!isPending);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (adId: string) => {
    setSelectedAdId(adId);
    onOpenChange(true);
  };

  const handleVisitAd = (adId: string) => {
    window.open(`https://www.facebook.com/ads/library/?id=${adId}`, "_blank");
  };

  const handleMarkComplete = (adId: string, reported: boolean) => {
    handleOpenConfirmModal(adId, " ", !reported);
    setConfirmModalOpen(true);
  };

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {toastProps && <Toast {...toastProps} onClose={handleCloseToast} />}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Manage Reported Ads</h3>
        <div className="flex gap-4">
          <Switch isSelected={isPending} onValueChange={handleToggle}>
            {isPending ? "Pending" : "All"}
          </Switch>

          <ExportButton handleExport={handleExport} />
        </div>
      </div>
      <Input
        classNames={{
          input: "w-full",
          mainWrapper: "w-full",
        }}
        placeholder="Search ads"
        value={searchTerm || ""}
        onChange={handleSearchChange}
      />
      <Button onClick={fetchAds} isLoading={loading}>
        Load Data
      </Button>

      {ads && ads.length > 0 && (
        <AdsTable
          columns={columns}
          data={ads}
          handleViewDetails={handleViewDetails}
          handleVisitAd={handleVisitAd}
          handleMarkComplete={handleMarkComplete}
        />
      )}
      <Pagination
        total={pages}
        initialPage={1}
        onChange={handlePageChange}
        page={page}
      />
      <AdDetailsModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        adId={selectedAdId}
        onVisitAd={handleVisitAd}
      />
      <ConfirmActionModal
        isOpen={confirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        onConfirm={() => {
          handleConfirmDelete();
          setConfirmModalOpen(false);
        }}
        onCancel={() => {
          handleOpenConfirmModal(null, "", false);
          setConfirmModalOpen(false);
        }}
        message="Are you sure you want to mark this ad as complete?"
      />
    </div>
  );
};

export default ReportedAdsList;
