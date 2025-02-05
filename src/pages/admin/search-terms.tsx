import React, { useCallback, useState } from "react";
import { AdminLayout } from "@/components/components/layout/adminLayout";
import { AddSearchTermModal } from "@/components/components/search-terms/add-search-term-modal";
import { SearchTermTable } from "@/components/components/search-terms/search-term-table";

const SearchTermsPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleSearchTermAdded = useCallback(() => {
    setRefresh(!refresh);
  }, [refresh]);

  return (
    <AdminLayout>
      <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Manage Search Terms</h3>
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <AddSearchTermModal onSearchTermAdded={handleSearchTermAdded} />
        </div>
        <SearchTermTable key={refresh} />
      </div>
    </AdminLayout>
  );
};

export default SearchTermsPage;
