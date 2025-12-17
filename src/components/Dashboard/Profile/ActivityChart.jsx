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
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-96 relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <MdHistory className="text-red-500" /> Activity Trends
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <span className="text-xs font-bold text-gray-500">Donations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
            <span className="text-xs font-bold text-gray-500">Requests</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={activityData} barCategoryGap="20%">
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
    </div>
  );
};

export default ActivityChart;
