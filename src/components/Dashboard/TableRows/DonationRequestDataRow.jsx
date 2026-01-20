import PropTypes from "prop-types";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";

const DonationRequestDataRow = ({
  request,
  handleDelete,
  handleStatusUpdate,
}) => {
  const { user } = useAuth();
  const {
    _id,
    recipientName,
    recipientDistrict,
    recipientUpazila,
    donationDate,
    donationTime,
    donationStatus,
    bloodGroup,
    donorName,
    donorEmail,
    requesterEmail,
  } = request;

  // Format time to AM/PM
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [percent, time] = timeString.split(" ");
    const [hours, minutes] = (time || timeString).split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const [role] = useRole();

  return (
    <>
      {/* Desktop View: Traditional Table Row */}
      <tr className="hidden md:table-row hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0 group">
        <td className="px-6 py-5 whitespace-nowrap">
          <div className="font-bold text-sm text-gray-900">{recipientName}</div>
        </td>
        <td className="px-6 py-5 whitespace-nowrap">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
              {recipientUpazila}
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              {recipientDistrict}
            </span>
          </div>
        </td>
        <td className="px-6 py-5 whitespace-nowrap">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
              {donationDate}
            </span>
            <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full w-fit mt-1 font-bold">
              {formatTime(donationTime)}
            </span>
          </div>
        </td>
        <td className="px-6 py-5 whitespace-nowrap text-center">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-xs font-black text-red-600 border border-red-100/50">
            {bloodGroup}
          </span>
        </td>
        <td className="px-6 py-5 whitespace-nowrap">
          <span
            className={`px-3 py-1 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest rounded-full border shadow-sm ${
              donationStatus === "inprogress"
                ? "bg-blue-50 text-blue-700 border-blue-100"
                : donationStatus === "done"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : donationStatus === "canceled"
                    ? "bg-red-50 text-red-700 border-red-100"
                    : donationStatus === "expired"
                      ? "bg-slate-100 text-slate-600 border-slate-200"
                      : "bg-amber-50 text-amber-700 border-amber-100"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                donationStatus === "inprogress"
                  ? "bg-blue-500"
                  : donationStatus === "done"
                    ? "bg-emerald-500"
                    : donationStatus === "canceled"
                      ? "bg-red-500"
                      : donationStatus === "expired"
                        ? "bg-slate-400"
                        : "bg-amber-500"
              }`}
            ></span>
            {donationStatus === "inprogress"
              ? "In Progress"
              : donationStatus === "done"
                ? "Completed"
                : donationStatus === "expired"
                  ? "Expired"
                  : donationStatus}
          </span>
        </td>
        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
          {donationStatus !== "pending" ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <Link
                  to={`/dashboard/profile/${donorEmail}`}
                  className="text-gray-900 font-bold text-xs hover:text-red-600 transition-colors"
                >
                  {donorName || "Unknown"}
                </Link>
                <span className="text-[10px] text-gray-400 font-medium">
                  {donorEmail || "No Email"}
                </span>
              </div>

              {donationStatus === "inprogress" && (
                <div className="flex items-center gap-1.5 ml-2 pl-4 border-l border-gray-100">
                  <button
                    onClick={() => handleStatusUpdate(_id, "done", request)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-[10px] font-black hover:bg-emerald-600 transition-all shadow-md shadow-emerald-200 active:scale-95"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(_id, "canceled", request)}
                    className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-[10px] font-black hover:bg-red-600 transition-all shadow-md shadow-red-200 active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span className="text-[11px] text-gray-300 italic font-medium">
              Not Assigned
            </span>
          )}
        </td>
        <td className="px-6 py-5 whitespace-nowrap text-sm text-right">
          <div className="flex items-center justify-end gap-2">
            <Link
              to={`/donation-requests/${_id}`}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
            >
              <FaEye size={14} />
            </Link>
            {(role === "admin" || user?.email === requesterEmail) && (
              <>
                <Link
                  to={
                    ["done", "canceled"].includes(donationStatus)
                      ? "#"
                      : `/dashboard/update-donation-request/${_id}`
                  }
                  className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all border border-transparent ${
                    ["done", "canceled"].includes(donationStatus)
                      ? "bg-gray-50 text-gray-200 cursor-not-allowed"
                      : "bg-slate-50 text-slate-400 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-200"
                  }`}
                >
                  <FaEdit size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(_id)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                >
                  <FaTrash size={14} />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>

      {/* Mobile View: Premium Card Layout */}
      <tr className="md:hidden">
        <td colSpan="7" className="px-4 py-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4 hover:border-red-100 transition-colors">
            {/* Top Row: Blood Group & Status */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-lg font-black text-red-600 border border-red-100">
                  {bloodGroup}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{recipientName}</h4>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {recipientUpazila}, {recipientDistrict}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                  donationStatus === "inprogress"
                    ? "bg-blue-50 text-blue-700 border-blue-100"
                    : donationStatus === "done"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : donationStatus === "canceled"
                        ? "bg-red-50 text-red-700 border-red-100"
                        : donationStatus === "expired"
                          ? "bg-slate-100 text-slate-600 border-slate-200 shadow-none"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                }`}
              >
                {donationStatus === "inprogress"
                  ? "In Progress"
                  : donationStatus === "expired"
                    ? "Expired"
                    : donationStatus}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                  When
                </p>
                <p className="font-bold text-gray-700">{donationDate}</p>
                <p className="text-[11px] text-gray-500 font-medium">
                  at {formatTime(donationTime)}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                  Donor
                </p>
                {donationStatus !== "pending" ? (
                  <Link
                    to={`/dashboard/profile/${donorEmail}`}
                    className="font-bold text-gray-700 hover:text-red-600 block truncate"
                  >
                    {donorName || "View Profile"}
                  </Link>
                ) : (
                  <p className="italic text-gray-300 font-medium">
                    Searching...
                  </p>
                )}
              </div>
            </div>

            {/* In-Progress Actions */}
            {donationStatus === "inprogress" && (
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleStatusUpdate(_id, "done", request)}
                  className="flex-1 py-2.5 rounded-2xl bg-emerald-500 text-white text-xs font-black shadow-lg shadow-emerald-200 active:scale-95"
                >
                  Mark Done
                </button>
                <button
                  onClick={() => handleStatusUpdate(_id, "canceled", request)}
                  className="flex-1 py-2.5 rounded-2xl bg-red-500 text-white text-xs font-black shadow-lg shadow-red-200 active:scale-95"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Bottom Actions */}
            <div
              className={`flex items-center gap-2 pt-2 ${
                donationStatus === "inprogress" ? "border-t border-gray-50" : ""
              }`}
            >
              <Link
                to={`/donation-requests/${_id}`}
                className="flex-2 py-3 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest text-center shadow-lg shadow-slate-200 active:scale-95 transition-all"
              >
                View Details
              </Link>
              {(role === "admin" || user?.email === requesterEmail) && (
                <>
                  <Link
                    to={
                      ["done", "canceled"].includes(donationStatus)
                        ? "#"
                        : `/dashboard/update-donation-request/${_id}`
                    }
                    className={`p-3 rounded-2xl border transition-all ${
                      ["done", "canceled"].includes(donationStatus)
                        ? "bg-gray-50 text-gray-200 border-gray-50 cursor-not-allowed"
                        : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
                    }`}
                  >
                    <FaEdit size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="p-3 rounded-2xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-100"
                  >
                    <FaTrash size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

DonationRequestDataRow.propTypes = {
  request: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default DonationRequestDataRow;
