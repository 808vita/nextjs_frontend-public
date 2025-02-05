import { Card, CardBody } from "@nextui-org/react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
}) => {
  return (
    <Card className="bg-default-50 rounded-xl shadow-md p-4 w-full">
      <CardBody>
        <h3 className="text-xl font-semibold text-default-900">{title}</h3>
        <span className="text-2xl font-bold text-primary-600">{value}</span>
        {description && (
          <p className="text-sm text-default-500 mt-2">{description}</p>
        )}
      </CardBody>
    </Card>
  );
};
