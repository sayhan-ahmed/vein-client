import PropTypes from "prop-types";
import { FaTint } from "react-icons/fa";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { useState, useEffect } from "react";

const BloodGroupDemand = ({ requests }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getBarColor = (group) => {
    const colors = {
      "O+": "#ef4444",
      "O-": "#dc2626",
      "A+": "#f97316",
      "A-": "#ea580c",
      "B+": "#06b6d4",
      "B-": "#0891b2",
      "AB+": "#8b5cf6",
      "AB-": "#7c3aed",
    };
    return colors[group] || "#6b7280";
  };

  // Calculate which blood groups are most requested (all requests, including completed)
  const demandData = useMemo(() => {
    if (!requests.length) return [];

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const demand = bloodGroups.map((group) => ({
      group,
      count: requests.filter((r) => r.bloodGroup === group).length,
      fill: getBarColor(group),
    }));

    return demand
      .sort((a, b) => b.count - a.count)
      .filter((d) => d.count > 0)
      .slice(0, 6); // Show top 6
  }, [requests]);

  const totalRequests = useMemo(() => {
    return demandData.reduce((sum, d) => sum + d.count, 0);
  }, [demandData]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-2xl">
          <p className="text-gray-900 font-bold mb-1 text-sm flex items-center gap-2">
            <FaTint style={{ color: payload[0].fill }} />
            {payload[0].payload.group}
          </p>
          <p className="text-xs font-semibold text-gray-600">
            {payload[0].value} Requests
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 relative overflow-hidden group h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 relative z-10">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter">
            Blood Group Demand
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Most Requested Types
          </p>
        </div>

        {/* Total Badge */}
        <div className="flex justify-between items-center gap-2 bg-white px-5 py-2 rounded-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
              Requests
            </span>
          </div>
          <span className="text-red-600 font-black text-sm">
            {totalRequests}
          </span>
        </div>
      </div>

      {/* Bar Chart */}
      {demandData.length > 0 ? (
        <div className="h-[240px] w-full relative z-10">
          {isMounted && (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={demandData} barSize={35}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="group"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 700 }}
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
                <Bar
                  dataKey="count"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1500}
                >
                  {demandData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      ) : (
        <div className="h-[240px] flex items-center justify-center text-gray-400 text-sm relative z-10">
          No request data available
        </div>
      )}

      {/* Decorative Background Icon */}
      <div className="absolute -right-6 -bottom-6 text-9xl text-red-50 opacity-30 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
        <FaTint />
      </div>
    </div>
  );
};

BloodGroupDemand.propTypes = {
  requests: PropTypes.array.isRequired,
};

export default BloodGroupDemand;
