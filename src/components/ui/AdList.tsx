import React from "react";
import { AdCard } from "./AdCard";

interface AdListProps {
  ads: any[];
}

export const AdList: React.FC<AdListProps> = ({ ads }) => {
  return (
    <div className="flex flex-wrap gap-4 w-full justify-center">
      {ads.map((ad: any, index: number) => (
        <div key={index} className="w-full max-w-sm">
          <AdCard ad={ad} />
        </div>
      ))}
    </div>
  );
};
