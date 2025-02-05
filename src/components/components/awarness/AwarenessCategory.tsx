import React from "react";

interface AwarenessCategoryProps {
  category_name: string;
  common_pattern: string;
  potential_user_targets: string[];
}

export const AwarenessCategory: React.FC<AwarenessCategoryProps> = ({
  category_name,
  common_pattern,
  potential_user_targets,
}) => {
  return (
    <div className="bg-default-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{category_name}</h2>
      <p className="mb-4 text-default-900">
        <span className="font-medium">Common Pattern: </span>
        {common_pattern}
      </p>
      <p className="font-medium text-default-700">Potential User Targets:</p>
      <ul className="list-disc pl-5 mt-2 text-default-700">
        {potential_user_targets.map((target, index) => (
          <li key={index}>{target}</li>
        ))}
      </ul>
    </div>
  );
};
