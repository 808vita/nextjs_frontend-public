import React, { useEffect, useState } from "react";
import { StatCard } from "./StatCard";
import dynamic from "next/dynamic";
import { TreeMapChart } from "../charts/TreeMapChart";

const Chart = dynamic(
  () => import("../charts/TreeMapChart").then((mod) => mod.TreeMapChart),
  {
    ssr: false,
  }
);

export const StatsContent: React.FC = () => {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTermsChartData, setSearchTermsChartData] = useState<
    { x: string; y: number }[]
  >([]);
  const [categoryChartData, setCategoryChartData] = useState<
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
        if (data.stats.ads_count_per_search_term) {
          const chartData = Object.entries(
            data.stats.ads_count_per_search_term
          ).map(([key, value]) => ({
            x: key,
            y: value as number,
          }));
          setSearchTermsChartData(chartData);
        }

        if (data.stats.ads_count_per_category) {
          const chartData = Object.entries(
            data.stats.ads_count_per_category
          ).map(([key, value]) => ({
            x: key,
            y: value as number,
          }));
          setCategoryChartData(chartData);
        }
        console.log("Data from api/stats: ", data);
      } catch (error: any) {
        setError(error.message || "Failed to fetch stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
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
      <h3 className="text-xl font-semibold pb-3">Statistics</h3>
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Stat Cards Section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Stats At A Glance</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
              <StatCard
                title="Total Ads Scanned"
                value={statsData.total_ads_scanned}
              />
              <StatCard
                title="Total Search Terms"
                value={statsData.total_search_terms_extracted}
              />
              <StatCard
                title="Total Scams Detected"
                value={statsData.is_scam_true_count}
                description="Ads flagged as potential scams"
              />
            </div>
          </div>
          {/* Chart Section */}
          <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Ads Count Per Category</h3>
            <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
              {categoryChartData && categoryChartData.length > 0 ? (
                <Chart data={categoryChartData} />
              ) : null}
              {statsData?.ads_count_per_category && (
                <div className="flex flex-col gap-4  bg-default-50 rounded-2xl p-6">
                  {Object.entries(statsData.ads_count_per_category).map(
                    ([key, value]) => (
                      <StatCard key={key} title={key} value={value as number} />
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
          <h3 className="text-xl font-semibold mt-4">Search Terms</h3>
          {statsData?.ads_count_per_search_term && (
            <div className="flex flex-col gap-4 bg-default-50 shadow-lg rounded-2xl p-6">
              {searchTermsChartData && searchTermsChartData.length > 0 ? (
                <Chart data={searchTermsChartData} />
              ) : null}
              {Object.entries(statsData.ads_count_per_search_term)
                //@ts-ignore
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([key, value]) => (
                  <StatCard key={key} title={key} value={value as number} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
