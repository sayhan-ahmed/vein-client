import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { FaChartBar, FaChartPie } from "react-icons/fa";

const AdminAnalytics = ({ roleData, requestData, totalUsers }) => {
  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-2xl">
          <p className="text-gray-900 font-bold mb-1 text-sm">{label}</p>
          <p
            className="text-xs font-semibold"
            style={{ color: payload[0].fill }}
          >
            {payload[0].value} Direct Hits
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart 1: Request Status Bars */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-4 relative z-10">
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter">
              Donation Trends
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Live Request Analysis
            </p>
          </div>

          {/* Custom Legend */}
          <div className="flex gap-2">
            {requestData.map((d) => (
              <div
                key={d.name}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-gray-100 shadow-sm transition-transform hover:scale-105"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: d.fill }}
                ></div>
                <span className="text-[10px] uppercase font-bold text-gray-600 tracking-wide">
                  {d.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[250px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={requestData} barSize={50}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />
              <XAxis
                dataKey="name"
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

              <Bar
                dataKey="value"
                radius={[8, 8, 8, 8]}
                animationDuration={1500}
              >
                {requestData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    strokeWidth={0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Decorative Background Icon */}
        <div className="absolute -right-6 -bottom-6 text-9xl text-gray-50 opacity-50 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
          <FaChartBar />
        </div>
      </div>

      {/* Chart 2: User Roles Pie */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter mb-1">
            Ecosystem
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
            User Distribution
          </p>
        </div>

        <div className="flex-1 min-h-[220px] relative flex items-center justify-center z-10">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleData}
                innerRadius={65}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                cornerRadius={8}
                startAngle={90}
                endAngle={-270}
              >
                {roleData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: "#6b7280",
                  textTransform: "uppercase",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none pb-8">
            <span className="text-3xl font-black text-gray-900 tracking-tighter">
              {totalUsers}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Total Users
            </span>
          </div>
        </div>

        {/* Decorative Background Icon */}
        <div className="absolute -right-6 -bottom-6 text-9xl text-gray-50 opacity-50 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
          <FaChartPie />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
