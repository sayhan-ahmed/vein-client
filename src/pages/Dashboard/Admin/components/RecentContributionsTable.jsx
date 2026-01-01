import PropTypes from "prop-types";
import { FaCoins, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const RecentContributionsTable = ({
  currentFunding,
  funding,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  itemsPerPage,
  onPageChange,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">
          Recent Contributions
        </h2>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Donor
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Amount
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Date
                </span>
              </th>
              <th className="px-6 py-3 text-right">
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Status
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentFunding.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        item.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                        {item.name}
                        <MdVerified className="text-blue-500 text-xs" />
                      </p>
                      <p className="text-xs text-gray-500">{item.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-gray-900">
                    ${item.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {new Date(item.createdAt || item.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 p-4">
        {currentFunding.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Donor Info Row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">{item.name.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-gray-900 flex items-center gap-1.5 mb-1">
                  {item.name}
                  <MdVerified className="text-blue-500 shrink-0" />
                </p>
                <p className="text-xs text-gray-500 truncate">{item.email}</p>
              </div>
            </div>

            {/* Amount, Date, Status Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Amount
                </p>
                <p className="text-lg font-black text-gray-900">
                  ${item.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Date
                </p>
                <p className="text-xs font-bold text-gray-700 leading-tight">
                  {new Date(item.createdAt || item.date).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
              <div className="flex items-end justify-end">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                  Completed
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {funding.length > itemsPerPage && (
        <div className="px-4 md:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, funding.length)} of{" "}
            {funding.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
                      currentPage === page
                        ? "bg-[#1D3657] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {funding.length === 0 && (
        <div className="py-16 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-50 mb-3">
            <FaCoins className="text-gray-300 text-xl" />
          </div>
          <p className="text-gray-500 text-sm font-medium">
            No funding records found yet.
          </p>
        </div>
      )}
    </div>
  );
};

RecentContributionsTable.propTypes = {
  currentFunding: PropTypes.array.isRequired,
  funding: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default RecentContributionsTable;
