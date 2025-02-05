import React, { useState, useCallback, useEffect } from "react";
import { Button, Pagination } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSidebarContext } from "@/components/components/layout/layout-context";
import { AdminLayout } from "@/components/components/layout/adminLayout";
import { AdsTable } from "@/components/ui/table/AdsTable";
import { ExportButton } from "@/components/reports/ReportedAds/reported-ads/ExportButton";

const handleExport = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/export/meta-ads`
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
    a.download = "scanned_ads.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    console.log(error.message || "Failed to export reported ads.");
  }
};

const ScannedAdsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [adsData, setAdsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setCollapsed } = useSidebarContext();
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const offset = (page - 1) * rowsPerPage;
  const [totalPages, setTotalPages] = useState(1);

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Search Term", uid: "search_term" },
    { name: "Is Scam", uid: "gemini_analysis" },
    { name: "Publisher Platforms", uid: "publisher_platforms" },
    { name: "Actions", uid: "actions" },
  ];

  const fetchAds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/checked-meta-ads-unsorted?offset=${offset}&limit=${rowsPerPage}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
      const responseData = await response.json();
      setAdsData(responseData);
    } catch (error: any) {
      setError(error.message || "Failed to fetch ads");
    } finally {
      setLoading(false);
    }
  }, [offset, rowsPerPage]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/stats`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();
      if (data?.stats?.total_ads_scanned) {
        setTotalPages(
          Math.ceil(data.stats.total_ads_scanned / rowsPerPage) || 1
        );
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch stats");
    }
  }, [rowsPerPage]);

  const handleInitialLoad = () => {
    if (status === "authenticated") {
      fetchAds();
      fetchStats();
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    fetchAds();
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }

    const initialPage = searchParams?.get("page");
    if (initialPage) {
      setPage(Number(initialPage));
    }
  }, [searchParams, setCollapsed]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <AdminLayout>
      <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Scanned Ads</h3>
          <div className="flex gap-4">
            <ExportButton handleExport={handleExport} />
          </div>
        </div>

        <Button onClick={handleInitialLoad} isLoading={loading}>
          Load Ads
        </Button>
        {adsData && adsData.length > 0 && (
          <AdsTable columns={columns} data={adsData} />
        )}
        <Pagination
          total={totalPages}
          initialPage={1}
          onChange={handlePageChange}
          page={page}
        />
      </div>
    </AdminLayout>
  );
};

export default ScannedAdsPage;
