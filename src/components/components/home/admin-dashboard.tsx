import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Link, Button } from "@nextui-org/react";
import { TableWrapper } from "../table/table";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AdList } from "@/components/ui/AdList";

const DynamicTreeMapChart = dynamic(
  () =>
    import("@/components/components/charts/TreeMapChart").then(
      (mod) => mod.TreeMapChart
    ),
  {
    ssr: false,
  }
);

export const AdminDashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [adsData, setAdsData] = useState<any[]>([]);
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryChartData, setCategoryChartData] = useState<
    { x: string; y: number }[]
  >([]);
  const [searchTermsChartData, setSearchTermsChartData] = useState<
    { x: string; y: number }[]
  >([]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/stats`
        );
        if (!response.ok) {
          const message = `HTTP error! status: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
        setStatsData(data.stats);

        if (data.stats.ads_count_per_category) {
          const chartData = Object.entries(
            data.stats.ads_count_per_category
          ).map(([key, value]) => ({
            x: key,
            y: value as number,
          }));
          setCategoryChartData(chartData);
        }
        if (data.stats.ads_count_per_search_term) {
          const chartData = Object.entries(
            data.stats.ads_count_per_search_term
          ).map(([key, value]) => ({
            x: key,
            y: value as number,
          }));
          setSearchTermsChartData(chartData);
        }
      } catch (error: any) {
        setError(error.message || "Failed to fetch stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/checked-meta-ads?limit=3`
      );
      if (response.ok) {
        const responseData = await response.json();
        setAdsData(responseData);
      } else {
        alert("There was error fetching ads. Please check the console");
        console.log("Fetch response not ok", response);
      }
    } catch (error) {
      console.error("Error", error);
      alert("There was error fetchcing ads data. Please check the logs.");
    }
  };

  useEffect(() => {
    status !== "loading" && status === "authenticated" && handleFetch();
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!statsData) {
    return <div>No Stats data available</div>;
  }
  return (
    <div className="h-full lg:px-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">Admin Dashboard</h3>
      </div>
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Ad Category Distribution</h3>
            <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
              {categoryChartData && categoryChartData.length > 0 ? (
                <DynamicTreeMapChart data={categoryChartData} />
              ) : null}
            </div>
          </div>

          {/* Latest Scanned Ads */}
          <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold flex justify-between items-center">
              Latest Scanned Ads
              <Link
                href="/admin/scanned"
                as={NextLink}
                color="primary"
                className="cursor-pointer"
              >
                View All
              </Link>
            </h3>
            {adsData.length > 0 ? (
              <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                <AdList ads={adsData} />
              </div>
            ) : (
              <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 text-default-400">
                No Ads Found
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
          <h3 className="text-xl font-semibold mt-4">
            Search Terms Distribution
          </h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6">
            {searchTermsChartData && searchTermsChartData.length > 0 ? (
              <DynamicTreeMapChart data={searchTermsChartData} />
            ) : null}
          </div>

          <h3 className="text-xl font-semibold">Quick Links</h3>
          <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
            <Card className=" bg-default-50 rounded-xl shadow-md px-4 py-6 w-full">
              <CardBody className="py-5 gap-6">
                <div className="flex gap-2.5 justify-center">
                  <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
                    <span className="text-default-900 text-xl font-semibold">
                      {"⭐"}Manage
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/admin/search-terms"
                    as={NextLink}
                    color="primary"
                  >
                    Manage Search Terms
                  </Link>
                  <Link href="/admin/awareness" as={NextLink} color="primary">
                    Manage Awareness
                  </Link>
                  <Link href="/admin/settings" as={NextLink} color="primary">
                    Settings
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
