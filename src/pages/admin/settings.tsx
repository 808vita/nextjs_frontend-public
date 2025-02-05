import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AdminLayout } from "@/components/components/layout/adminLayout";
import { SettingsInput } from "@/components/components/settings/SettingsInput";
import { useSettings } from "@/components/components/hooks/useSettings";
const SettingsPage: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    data: settingsData,
    handleUpdateSettings: handleUpdateSettingsLimit,
  } = useSettings({
    initialData: { results_limit: 10 },
    apiCall: async (value: number) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/settings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ results_limit: value }),
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
    },
  });

  const { data: tokenData, handleUpdateSettings: handleUpdateToken } =
    useSettings({
      initialData: { token: "" },
      apiCall: async (value: string) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/access-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: value }),
          }
        );
        if (response.ok) {
          return await response.json();
        } else {
          const errorData = await response.json();
          throw new Error(
            errorData.detail || `HTTP error! status: ${response.status}`
          );
        }
      },
    });
  const [intialToken, setInitialToken] = useState("");
  const fetchToken = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/access-token`
      );
      if (response.ok) {
        const res = await response.json();
        if (res && res.access_token) {
          setInitialToken(res.access_token?.token);
        }
      }
    } catch (error) {
      console.error("Error Fetching access token : ", error);
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      fetchToken();
    }
  }, [status]);

  useEffect(() => {
    console.log(tokenData);
  }, [tokenData]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AdminLayout>
        <h3 className="text-xl font-semibold"> Settings </h3>
        <div className="flex flex-col gap-4 max-w-md mx-auto mt-10">
          {settingsData && (
            <SettingsInput
              label="Result Limit"
              initialValue={settingsData.results_limit}
              type="number"
              onSave={handleUpdateSettingsLimit}
            />
          )}
          {intialToken && (
            <SettingsInput
              label="Meta Access Token"
              initialValue={intialToken}
              type="text"
              onSave={handleUpdateToken}
            />
          )}
        </div>
      </AdminLayout>
    </div>
  );
};

export default SettingsPage;
