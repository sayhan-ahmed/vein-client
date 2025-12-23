import PropTypes from "prop-types";
import { MdTrendingUp } from "react-icons/md";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FundingTrendsChart = ({ trendData, statistics }) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">Total Funding</h2>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="text-lg font-bold text-green-600">
              ${statistics.totalFunding.toLocaleString()}
            </span>
          </span>
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <MdTrendingUp />
            {statistics.growthRate >= 0 ? "+" : ""}
            {statistics.growthRate.toFixed(0)}%
          </span>
          <span>VS Last Week</span>
        </div>
      </div>
      {trendData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">
          No funding data available
        </div>
      )}
    </div>
  );
};

FundingTrendsChart.propTypes = {
  trendData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  statistics: PropTypes.shape({
    totalFunding: PropTypes.number.isRequired,
    growthRate: PropTypes.number.isRequired,
  }).isRequired,
};

export default FundingTrendsChart;
