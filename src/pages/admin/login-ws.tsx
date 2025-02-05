import React from "react";
import { AdminLayout } from "@/components/components/layout/adminLayout";

import { useSession } from "next-auth/react";
import LoginSocket from "@/components/ui/LoginSocket";

const LoginWSPage: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading....</div>;
  }

  return (
    <AdminLayout>
      {status === "authenticated" && (
        <div className="max-w-4xl mx-auto py-10 px-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Meta Login with Socket
          </h1>
          <LoginSocket />
        </div>
      )}
    </AdminLayout>
  );
};

export default LoginWSPage;
