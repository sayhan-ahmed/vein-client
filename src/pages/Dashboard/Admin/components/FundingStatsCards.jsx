import PropTypes from "prop-types";
import { BiDollar } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { FaCoins, FaCalendarAlt } from "react-icons/fa";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

const FundingStatsCards = ({ statistics, funding }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Funding */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-500 uppercase">
            Total Funding
          </span>
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <BiDollar className="text-xl text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          ${statistics.totalFunding.toLocaleString()}
        </h3>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
            <MdTrendingUp className="text-sm" />
            {statistics.growthRate >= 0 ? "+" : ""}
            {statistics.growthRate.toFixed(1)}%
          </span>
          <span className="text-xs text-gray-400">vs last month</span>
        </div>
      </div>

      {/* Active Contributors */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-500 uppercase">
            Active Contributors
          </span>
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <HiUsers className="text-xl text-blue-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          {statistics.totalContributors.toLocaleString()}
        </h3>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-xs text-blue-600 font-medium">
            {funding.length} contributions
          </span>
        </div>
      </div>

      {/* Highest Contribution */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-500 uppercase">
            Highest Contribution
          </span>
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <FaCoins className="text-lg text-purple-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          ${Math.max(...funding.map((f) => f.amount || 0), 0).toLocaleString()}
        </h3>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-xs text-gray-500">
            Avg: ${statistics.avgContribution.toFixed(2)}
          </span>
        </div>
      </div>

      {/* This Month */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-500 uppercase">
            This Month
          </span>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <FaCalendarAlt className="text-lg text-amber-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          ${statistics.thisMonthFunding.toLocaleString()}
        </h3>
        <div className="flex items-center gap-1 mt-2">
          {statistics.growthRate >= 0 ? (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <MdTrendingUp />
              Growth
            </span>
          ) : (
            <span className="text-xs text-red-600 font-medium flex items-center gap-1">
              <MdTrendingDown />
              Decline
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

FundingStatsCards.propTypes = {
  statistics: PropTypes.shape({
    totalFunding: PropTypes.number.isRequired,
    totalContributors: PropTypes.number.isRequired,
    avgContribution: PropTypes.number.isRequired,
    thisMonthFunding: PropTypes.number.isRequired,
    growthRate: PropTypes.number.isRequired,
  }).isRequired,
  funding: PropTypes.array.isRequired,
};

export default FundingStatsCards;
