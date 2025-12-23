import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ContributionDistribution = ({ distributionData }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 mb-4">
        Contribution Range
      </h2>
      {distributionData.length > 0 ? (
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={distributionData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {distributionData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">
          No distribution data
        </div>
      )}
    </div>
  );
};

ContributionDistribution.propTypes = {
  distributionData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContributionDistribution;
