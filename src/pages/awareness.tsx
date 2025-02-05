import React, { useState, useEffect } from "react";
import { AwarenessCategory } from "@/components/components/awarness/AwarenessCategory";
import Link from "next/link";

const PublicAwarenessPage: React.FC = () => {
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

  if (loading) {
    return <div>Loading awareness information...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold  mb-8">Public Awareness</h1>
        <Link
          href="/"
          className="bg-primary-500 px-4 py-2 text-white rounded-md"
        >
          Go to Homepage
        </Link>
      </div>

      <p className="text-md text-default-700 mt-4 mb-6">
        This content is generated automatically based on the latest scam
        patterns identified by AdShield. It provides information on common
        tactics and potential user targets.
      </p>
      <div className="flex flex-col gap-8">
        {categories.map((category, index) => (
          <AwarenessCategory key={index} {...category} />
        ))}
      </div>
    </div>
  );
};

export default PublicAwarenessPage;
