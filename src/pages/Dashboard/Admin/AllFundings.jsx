import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AllFundingsSkeleton from "./components/AllFundingsSkeleton";
import {
  FaCoins,
  FaUserAlt,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const AllFundings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: fundings = [], isPending } = useQuery({
    queryKey: ["all-fundings"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // For now, mock data
      return [
        {
          id: 1,
          name: "John Anderson",
          amount: 500,
          date: "2025-12-20",
          email: "john@example.com",
        },
        {
          id: 2,
          name: "Sarah Mitchell",
          amount: 250,
          date: "2025-12-19",
          email: "sarah@example.com",
        },
        {
          id: 3,
          name: "Michael Chen",
          amount: 100,
          date: "2025-12-19",
          email: "michael@example.com",
        },
        {
          id: 4,
          name: "Emily Rodriguez",
          amount: 50,
          date: "2025-12-18",
          email: "emily@example.com",
        },
        {
          id: 5,
          name: "David Thompson",
          amount: 200,
          date: "2025-12-18",
          email: "david@example.com",
        },
      ];
    },
  });

  if (isPending) {
    return <AllFundingsSkeleton />;
  }

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-xl">
              <FaCoins className="text-amber-500" />
            </div>
            All Fundings
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Monitoring total platform contributions and donor impact.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Total Raised
            </p>
            <p className="text-xl font-black text-gray-900">$2,150.00</p>
          </div>
          <div className="w-px h-8 bg-gray-100 mx-2"></div>
          <div className="p-2 bg-green-50 rounded-lg">
            <FaCheckCircle className="text-green-500" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FaUserAlt className="text-red-400" /> Donor Info
                  </span>
                </th>
                <th className="px-8 py-6">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FaCoins className="text-amber-400" /> Amount
                  </span>
                </th>
                <th className="px-8 py-6">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-400" /> Date
                  </span>
                </th>
                <th className="px-8 py-6 text-right">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Status
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fundings.map((funding) => (
                <tr
                  key={funding.id}
                  className="group hover:bg-gray-50/80 transition-all duration-300"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                        {funding.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                          {funding.name}
                          <MdVerified className="text-blue-500" />
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          {funding.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-black text-gray-900">
                        ${funding.amount.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        USD
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-gray-600">
                      {new Date(funding.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-100 shadow-sm">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State if no data */}
        {fundings.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
              <FaCoins className="text-gray-200 text-2xl" />
            </div>
            <p className="text-gray-400 font-medium">
              No funding records found yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFundings;
