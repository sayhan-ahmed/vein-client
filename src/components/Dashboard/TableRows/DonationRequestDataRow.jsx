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
    <tr className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0 group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-semibold text-sm text-gray-900">
          {recipientName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">
            {recipientUpazila}
          </span>
          <span className="text-[11px] text-gray-400">{recipientDistrict}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">
            {donationDate}
          </span>
          <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded w-fit mt-0.5">
            {formatTime(donationTime)}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="inline-flex items-center justify-center text-xs font-extrabold text-red-600">
          {bloodGroup}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2.5 py-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide rounded-full border ${
            donationStatus === "inprogress"
              ? "bg-blue-50 text-blue-700 border-blue-100"
              : donationStatus === "done"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : donationStatus === "canceled"
              ? "bg-red-50 text-red-700 border-red-100"
              : "bg-amber-50 text-amber-700 border-amber-100"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              donationStatus === "inprogress"
                ? "bg-blue-500"
                : donationStatus === "done"
                ? "bg-emerald-500"
                : donationStatus === "canceled"
                ? "bg-red-500"
                : "bg-amber-500"
            }`}
          ></span>
          {donationStatus === "inprogress"
            ? "In Progress"
            : donationStatus === "done"
            ? "Completed"
            : donationStatus.charAt(0).toUpperCase() + donationStatus.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {donationStatus !== "pending" ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <Link
                to={`/dashboard/profile/${donorEmail}`}
                className="text-gray-900 font-semibold text-xs hover:text-red-600 hover:underline transition-all"
              >
                {donorName || "Unknown"}
              </Link>
              <span className="text-[10px] text-gray-400">
                {donorEmail || "No Email"}
              </span>
            </div>

            {donationStatus === "inprogress" && (
              <div className="flex items-center gap-1.5 ml-2 pl-4 border-l border-gray-100">
                <button
                  onClick={() => handleStatusUpdate(_id, "done", request)}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm active:scale-95"
                  title="Mark as Done"
                >
                  Done
                </button>
                <button
                  onClick={() => handleStatusUpdate(_id, "canceled", request)}
                  className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold border border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm active:scale-95"
                  title="Cancel Request"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ) : (
          <span className="text-[11px] text-gray-400 italic">N/A</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1">
            <Link
              to={`/donation-requests/${_id}`}
              className="hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all text-gray-400"
              title="View Details"
            >
              <FaEye className="w-3.5 h-3.5" />
            </Link>
            {/* Show Edit/Delete for Admin or the original Requester */}
            {(role === "admin" || user?.email === requesterEmail) && (
              <>
                {["done", "canceled"].includes(donationStatus) ? (
                  <button
                    disabled
                    className="p-2 rounded-lg text-gray-300 cursor-not-allowed"
                    title="Completed or canceled requests cannot be edited"
                  >
                    <FaEdit className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    to={`/dashboard/update-donation-request/${_id}`}
                    className="hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all text-gray-400"
                    title="Edit"
                  >
                    <FaEdit className="w-3.5 h-3.5" />
                  </Link>
                )}
                <button
                  onClick={() => handleDelete(_id)}
                  className="hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all text-gray-400"
                  title="Delete"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

DonationRequestDataRow.propTypes = {
  request: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default DonationRequestDataRow;
