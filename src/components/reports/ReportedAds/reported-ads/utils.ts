import { useState, useCallback, useMemo } from "react";

interface ReportedAd {
  id: string;
  ad_id: string;
  report_reason: string;
  reported: boolean;
  created_at: string;
  updated_at: string;
}
export const useReportedAds = () => {
  const [ads, setAds] = useState<ReportedAd[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    ad_id: string | null;
    reported: boolean;
  }>({ ad_id: null, reported: false });

  const [toastProps, setToastProps] = useState<{
    title: string;
    description: string;
    color: "success" | "danger" | undefined;
  } | null>(null);

  const handleCloseToast = () => {
    setToastProps(null);
  };
  const fetchAds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = isPending
        ? `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/reported-ads-pending`
        : `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/reported-ads-all`;

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();
      const updatedData = data.map((item: any) => ({
        ...item,
        id: item.ad_id, // Using ad_id to generate id for each object
      }));
      setAds(updatedData);
    } catch (error: any) {
      setError(error.message || "Failed to fetch reported ads.");
    } finally {
      setLoading(false);
    }
  }, [isPending]);

  const handleReportAd = async (
    ad_id: string,
    report_reason: string,
    reported: boolean
  ) => {
    if (!ad_id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/reported-ads/${ad_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ad_id,
            reported: reported,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
      setToastProps({
        title: "Report Updated",
        description: "Status update",
        color: "success",
      });
      await fetchAds();
    } catch (error: any) {
      setError(error.message || "Failed to update the report data");
    } finally {
      setLoading(false);
      setDeleteConfirmation({ ad_id: null, reported: false });
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/export/reported-ads`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reported_ads.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      setError(error.message || "Failed to export reported ads.");
    }
  };

  const handleOpenConfirmModal = (
    ad_id: string | null,
    report_reason: string,
    reported: boolean
  ) => {
    setDeleteConfirmation({ ad_id, reported });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.ad_id) {
      handleReportAd(deleteConfirmation.ad_id, "", deleteConfirmation.reported);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm) return ads;
    return ads.filter(
      (item) =>
        item.ad_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.report_reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.created_at)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, ads]);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = useMemo(() => {
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, startIndex, endIndex]);
  const pages = useMemo(() => {
    return Math.ceil(filteredItems.length / itemsPerPage) || 1;
  }, [filteredItems, itemsPerPage]);

  const handleViewDetails = async (ad_id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/reported-ads/${ad_id}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
      const reportedAd = await response.json();
      const metaAdResponse = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/checked-meta-ads/${reportedAd.ad_id}`
      );

      if (!metaAdResponse.ok) {
        const errorData = await metaAdResponse.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${metaAdResponse.status}`
        );
      }
      const metaAdData = await metaAdResponse.json();
      return metaAdData.ad;
    } catch (error: any) {
      setError(error.message || "Failed to fetch ad details.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    ads: paginatedItems,
    loading,
    error,
    isPending,
    setPending: setIsPending,
    handleViewDetails,
    handleReportAd,
    fetchAds,
    handlePageChange,
    pages,
    page,
    searchTerm,
    setSearchTerm,
    handleOpenConfirmModal,
    deleteConfirmation,
    handleConfirmDelete,
    handleExport,
    toastProps,
    handleCloseToast,
  };
};
