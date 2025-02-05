import { Accounts } from "@/components/components/accounts";

import { AdminLayout } from "@/components/components/layout/adminLayout";
import React from "react";

const accounts = () => {
  return (
    <div>
      <AdminLayout>
        <Accounts />
      </AdminLayout>
    </div>
  );
};

export default accounts;
