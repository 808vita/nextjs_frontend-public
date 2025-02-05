import { AdminLayout } from "@/components/components/layout/adminLayout";
import ReportedAdsList from "@/components/reports/ReportedAds/reported-ads/ReportedAdsList";
import React from "react";

const reports = () => {
  return (
    <div>
      <AdminLayout>
        <ReportedAdsList />
      </AdminLayout>
    </div>
  );
};

export default reports;
