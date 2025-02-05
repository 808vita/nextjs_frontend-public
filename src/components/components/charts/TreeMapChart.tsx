import React from "react";
import Chart, { Props } from "react-apexcharts";

interface TreeMapChartProps {
  data: { x: string; y: number }[];
}

export const TreeMapChart: React.FC<TreeMapChartProps> = ({ data }) => {
  const options: Props["options"] = {
    legend: {
      show: false,
    },
    chart: {
      type: "treemap",
      toolbar: {
        show: false,
      },
      foreColor: "hsl(var(--nextui-default-800))",
    },
    title: {
      text: "Distribution",
      style: {
        color: "hsl(var(--nextui-default-800))",
      },
    },
    plotOptions: {
      treemap: {
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 10,
              color: "hsl(var(--nextui-primary-500))",
            },
            {
              from: 10,
              to: 20,
              color: "hsl(var(--nextui-primary-600))",
            },
            {
              from: 20,
              to: 30,
              color: "hsl(var(--nextui-primary-700))",
            },
            {
              from: 30,
              to: 40,
              color: "hsl(var(--nextui-primary-800))",
            },
            {
              from: 40,
              to: 50,
              color: "hsl(var(--nextui-primary-900))",
            },
          ],
        },
      },
    },
  };

  const series: Props["series"] = [{ data }];

  return (
    <div className="w-full z-20">
      <div id="chart">
        <Chart options={options} series={series} type="treemap" height={350} />
      </div>
    </div>
  );
};
