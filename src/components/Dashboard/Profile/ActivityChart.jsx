// ================= [ ACTIVITY CHART ] ================= //
// > Visualizes user donation and request trends.
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MdHistory } from "react-icons/md";

const ActivityChart = ({ activityData }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100 h-96 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 text-base sm:text-lg">
          <MdHistory className="text-red-500" /> Activity Trends
        </h3>
        <div className="flex gap-4 self-end sm:self-auto">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
              Donations
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
            <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
              Requests
            </span>
          </div>
        </div>
      </div>
      <div className="h-[280px] w-full">
        {isMounted && (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={activityData}
              barCategoryGap="15%"
              margin={{ top: 10, right: 10, left: -15, bottom: 15 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                cursor={{ fill: "#f8fafc" }}
              />
              <Bar
                dataKey="donations"
                fill="#FA2C37"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
              <Bar
                dataKey="requests"
                fill="#52A1FF"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ActivityChart;
