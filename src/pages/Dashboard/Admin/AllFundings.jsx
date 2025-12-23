import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AllFundingsSkeleton from "./components/AllFundingsSkeleton";
import FundingStatsCards from "./components/FundingStatsCards";
import FundingTrendsChart from "./components/FundingTrendsChart";
import ContributionDistribution from "./components/ContributionDistribution";
import RecentContributionsTable from "./components/RecentContributionsTable";
import { useMemo, useState } from "react";
import { FaCoins } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";

const AllFundings = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: funding = [], isPending } = useQuery({
    queryKey: ["all-funding"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/funding");
      return data;
    },
  });

  // Calculate statistics from real data
  const statistics = useMemo(() => {
    if (!funding.length) {
      return {
        totalFunding: 0,
        totalContributors: 0,
        avgContribution: 0,
        thisMonthFunding: 0,
        lastMonthFunding: 0,
        growthRate: 0,
      };
    }

    const totalFunding = funding.reduce((sum, f) => sum + (f.amount || 0), 0);
    const totalContributors = new Set(funding.map((f) => f.email)).size;
    const avgContribution = totalFunding / funding.length;

    const now = new Date();
    const thisMonth = funding.filter((f) => {
      const date = new Date(f.createdAt || f.date);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    });

    const lastMonth = funding.filter((f) => {
      const date = new Date(f.createdAt || f.date);
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);
      return (
        date.getMonth() === lastMonthDate.getMonth() &&
        date.getFullYear() === lastMonthDate.getFullYear()
      );
    });

    const thisMonthFunding = thisMonth.reduce(
      (sum, f) => sum + (f.amount || 0),
      0
    );
    const lastMonthFunding = lastMonth.reduce(
      (sum, f) => sum + (f.amount || 0),
      0
    );

    const growthRate =
      lastMonthFunding > 0
        ? ((thisMonthFunding - lastMonthFunding) / lastMonthFunding) * 100
        : thisMonthFunding > 0
        ? 100
        : 0;

    return {
      totalFunding,
      totalContributors,
      avgContribution,
      thisMonthFunding,
      lastMonthFunding,
      growthRate,
    };
  }, [funding]);

  // Prepare trend data for chart (last 7 days)
  const trendData = useMemo(() => {
    if (!funding.length) return [];

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        amount: 0,
      };
    });

    funding.forEach((f) => {
      const fDate = new Date(f.createdAt || f.date);
      const dayIndex = last7Days.findIndex((d) => {
        const [month, day] = d.date.split(" ");
        const checkDate = new Date(
          fDate.getFullYear(),
          fDate.getMonth(),
          fDate.getDate()
        );
        const targetDate = new Date(`${month} ${day}, ${fDate.getFullYear()}`);
        return checkDate.getTime() === targetDate.getTime();
      });
      if (dayIndex !== -1) {
        last7Days[dayIndex].amount += f.amount || 0;
      }
    });

    return last7Days;
  }, [funding]);

  // Contribution distribution by range
  const distributionData = useMemo(() => {
    if (!funding.length) return [];

    const ranges = [
      { name: "$1-$50", min: 1, max: 50, count: 0, color: "#ef4444" },
      { name: "$51-$100", min: 51, max: 100, count: 0, color: "#f59e0b" },
      { name: "$101-$500", min: 101, max: 500, count: 0, color: "#10b981" },
      { name: "$500+", min: 501, max: Infinity, count: 0, color: "#3b82f6" },
    ];

    funding.forEach((f) => {
      const amount = f.amount || 0;
      const range = ranges.find((r) => amount >= r.min && amount <= r.max);
      if (range) range.count++;
    });

    return ranges.filter((r) => r.count > 0);
  }, [funding]);

  // Pagination calculations
  const totalPages = Math.ceil(funding.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFunding = funding.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isPending) {
    return <AllFundingsSkeleton />;
  }

  return (
    <div className="min-h-screen font-sans text-gray-900 w-full mt-2 pb-10">
      <div className="mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-green-500/5 transition-colors duration-700"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                All <span className="text-red-600">Funding</span>
                <FaCoins className="text-amber-200 mt-1" size={36} />
              </h1>
              <p className="text-sm text-gray-500 mt-2 font-medium max-w-lg">
                Comprehensive overview of platform contributions and donor
                engagement.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-2xl shadow-inner">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-green-600 border border-green-50">
                <BiDollar size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Total Raised
                </p>
                <p className="text-xl font-black text-gray-900 tracking-tighter leading-none">
                  ${statistics.totalFunding.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <FundingStatsCards statistics={statistics} funding={funding} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <FundingTrendsChart trendData={trendData} statistics={statistics} />
          <ContributionDistribution distributionData={distributionData} />
        </div>

        {/* Recent Contributions Table */}
        <RecentContributionsTable
          currentFunding={currentFunding}
          funding={funding}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllFundings;
