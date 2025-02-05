import { AdminLayout } from "@/components/components/layout/adminLayout";
import React from "react";
import { StatsContent } from "@/components/components/stats/StatsContent";

const stats = () => {
  return (
    <div>
      <AdminLayout>
        <StatsContent />
      </AdminLayout>
    </div>
  );
};

export default stats;
