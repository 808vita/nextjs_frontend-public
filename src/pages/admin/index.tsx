import { AdminLayout } from "@/components/components/layout/adminLayout";
import React from "react";
import { AdminDashboard } from "@/components/components/home/admin-dashboard";
const admin = () => {
  return (
    <div>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </div>
  );
};

export default admin;
