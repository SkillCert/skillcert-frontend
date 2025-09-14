import React, { ReactElement } from "react";

interface Metric {
  icon: ReactElement;
  label: string;
  value: string;
}

interface DashboardMetricsProps {
  metrics: Metric[];
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ metrics }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-[85%] mx-auto">
    {metrics.map((metric, idx) => (
      <div
        key={idx}
        className="bg-[#23283b] rounded-xl p-7 flex flex-row items-center shadow-md min-h-[140px]"
      >
        <div className="flex items-center justify-center w-[50px] h-[35px] mr-4">
          {metric.icon}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-3xl font-bold text-purple-600 mb-1">
            {metric.value}
          </span>
          <span className="text-base text-gray-400 font-medium">
            {metric.label}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default DashboardMetrics;
