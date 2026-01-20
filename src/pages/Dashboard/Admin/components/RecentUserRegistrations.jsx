import PropTypes from "prop-types";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useState, useEffect } from "react";

const RecentUserRegistrations = ({ users }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate user registrations over last 7 days
  const registrationData = useMemo(() => {
    if (!users.length) return [];

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        donors: 0,
        volunteers: 0,
        total: 0,
        fullDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      };
    });

    users.forEach((user) => {
      const userDate = new Date(user.createdAt || user.timestamp);
      const dayData = last7Days.find(
        (d) =>
          d.fullDate.getTime() ===
          new Date(
            userDate.getFullYear(),
            userDate.getMonth(),
            userDate.getDate(),
          ).getTime(),
      );
      if (dayData) {
        dayData.total++;
        if (user.role === "donor") dayData.donors++;
        if (user.role === "volunteer") dayData.volunteers++;
      }
    });

    return last7Days.map(({ date, donors, volunteers, total }) => ({
      date,
      donors,
      volunteers,
      total,
    }));
  }, [users]);

  const totalNewUsers = useMemo(() => {
    return registrationData.reduce((sum, d) => sum + d.total, 0);
  }, [registrationData]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-2xl">
          <p className="text-gray-900 font-bold mb-2 text-sm">
            {payload[0].payload.date}
          </p>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-red-600">
              Donors: {payload[0].payload.donors}
            </p>
            <p className="text-xs font-semibold text-blue-600">
              Volunteers: {payload[0].payload.volunteers}
            </p>
            <p className="text-xs font-bold text-gray-900 border-t border-gray-100 pt-1 mt-1">
              Total: {payload[0].payload.total}
            </p>
          </div>
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
            New Registrations
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Last 7 Days Activity
          </p>
        </div>

        {/* Total Badge */}
        <div className="flex justify-between items-center gap-2 bg-white px-5 py-2 rounded-full border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
              New Users
            </span>
          </div>
          <span className="text-green-600 font-black text-sm">
            {totalNewUsers}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[240px] w-full relative z-10">
        {registrationData.length > 0 ? (
          <>
            {isMounted && (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={registrationData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f3f4f6"
                  />
                  <XAxis
                    dataKey="date"
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
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No registration data available
          </div>
        )}
      </div>

      {/* Decorative Background Icon */}
      <div className="absolute -right-6 -bottom-6 text-9xl text-green-50 opacity-30 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
        <FaUsers />
      </div>
    </div>
  );
};

RecentUserRegistrations.propTypes = {
  users: PropTypes.array.isRequired,
};

export default RecentUserRegistrations;
