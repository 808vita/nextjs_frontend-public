import React, { useState, useEffect } from "react";
import { AwarenessCategory } from "@/components/components/awarness/AwarenessCategory";
import { AdminLayout } from "@/components/components/layout/adminLayout";

const AdminAwarenessPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/categories`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.detail || `HTTP error! status: ${response.status}`
          );
        }
        const data = await response.json();
        setCategories(data);
      } catch (error: any) {
        setError(error.message || "Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      {loading ? (
        <div>Loading awareness information...</div>
      ) : (
        <div className="max-w-4xl mx-auto py-10 px-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Admin Awareness
          </h1>
          <div className="flex flex-col gap-8">
            {categories.map((category, index) => (
              <AwarenessCategory key={index} {...category} />
            ))}
          </div>
        </div>
      )}
      {error && <div className="text-red-500">Error: {error}</div>}
    </AdminLayout>
  );
};

export default AdminAwarenessPage;
