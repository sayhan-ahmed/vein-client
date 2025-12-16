import PropTypes from "prop-types";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const DonationRequestDataRow = ({ request, handleDelete }) => {
  const {
    _id,
    recipientName,
    recipientDistrict,
    recipientUpazila,
    donationDate,
    donationTime,
    donationStatus,
  } = request;

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{recipientName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {recipientUpazila}, {recipientDistrict}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {donationDate} <br /> {donationTime}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          className={`relative inline-block px-3 py-1 font-semibold leading-tight text-white rounded-full ${
            donationStatus === "inprogress"
              ? "bg-yellow-500"
              : donationStatus === "done"
              ? "bg-green-500"
              : donationStatus === "canceled"
              ? "bg-red-500"
              : "bg-blue-400"
          }`}
        >
          <span className="relative">{donationStatus}</span>
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-2">
          {/* Edit Button */}
          <Link
            to={`/dashboard/update-donation-request/${_id}`}
            className="btn btn-xs btn-neutral text-white"
            title="Edit"
          >
            <FaEdit />
          </Link>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-xs btn-error text-white"
            title="Delete"
          >
            <FaTrash />
          </button>

          {/* View Details Button */}
          <Link
            to={`/donation-requests/${_id}`}
            className="btn btn-xs btn-info text-white"
            title="View"
          >
            <FaEye />
          </Link>
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
