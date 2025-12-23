import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaChartLine } from "react-icons/fa";

const DonationRequestTrendsChart = ({ requests }) => {
  const [period, setPeriod] = useState("daily");

  // Calculate trend data based on selected period
  const trendData = useMemo(() => {
    if (!requests.length) return [];

    const now = new Date();

    if (period === "daily") {
      // Last 7 days
      const dailyData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          label: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          count: 0,
          date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        };
      });

      requests.forEach((req) => {
        const reqDate = new Date(req.createdAt || req.date);
        const dayData = dailyData.find(
          (d) =>
            d.date.getTime() ===
            new Date(
              reqDate.getFullYear(),
              reqDate.getMonth(),
              reqDate.getDate()
            ).getTime()
        );
        if (dayData) dayData.count++;
      });

      return dailyData.map(({ label, count }) => ({ label, count }));
    } else if (period === "weekly") {
      // Last 4 weeks
      const weeklyData = Array.from({ length: 4 }, (_, i) => {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - (3 - i) * 7);
        return {
          label: `Week ${4 - i}`,
          count: 0,
          weekStart: new Date(
            weekStart.getFullYear(),
            weekStart.getMonth(),
            weekStart.getDate()
          ),
        };
      });

      requests.forEach((req) => {
        const reqDate = new Date(req.createdAt || req.date);
        const weekIndex = weeklyData.findIndex((w) => {
          const weekEnd = new Date(w.weekStart);
          weekEnd.setDate(weekEnd.getDate() + 7);
          return reqDate >= w.weekStart && reqDate < weekEnd;
        });
        if (weekIndex !== -1) weeklyData[weekIndex].count++;
      });

      return weeklyData.map(({ label, count }) => ({ label, count }));
    } else {
      // Last 6 months
      const monthlyData = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (5 - i));
        return {
          label: date.toLocaleDateString("en-US", { month: "short" }),
          count: 0,
          month: date.getMonth(),
          year: date.getFullYear(),
        };
      });

      requests.forEach((req) => {
        const reqDate = new Date(req.createdAt || req.date);
        const monthData = monthlyData.find(
          (m) =>
            m.month === reqDate.getMonth() && m.year === reqDate.getFullYear()
        );
        if (monthData) monthData.count++;
      });

      return monthlyData.map(({ label, count }) => ({ label, count }));
    }
  }, [requests, period]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-2xl">
          <p className="text-gray-900 font-bold mb-1 text-sm">
            {payload[0].payload.label}
          </p>
          <p className="text-xs font-semibold text-blue-600">
            {payload[0].value} Requests
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 relative z-10">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter">
            Request Trends
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Time-Based Analysis
          </p>
        </div>

        {/* Period Toggle Buttons */}
        <div className="flex gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          {["daily", "weekly", "monthly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all duration-300 ${
                period === p
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "text-gray-400 hover:text-blue-600 hover:bg-white/50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[250px] w-full relative z-10">
        {trendData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: 700 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: 600 }}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "#f9fafb" }}
                content={<CustomTooltip />}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCount)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No request data available
          </div>
        )}
      </div>

      {/* Decorative Background Icon */}
      <div className="absolute -right-6 -bottom-6 text-9xl text-gray-50 opacity-50 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
        <FaChartLine />
      </div>
    </div>
  );
};

DonationRequestTrendsChart.propTypes = {
  requests: PropTypes.array.isRequired,
};

export default DonationRequestTrendsChart;
