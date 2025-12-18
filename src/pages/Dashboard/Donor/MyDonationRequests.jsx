import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonationRequestDataRow from "../../../components/Dashboard/TableRows/DonationRequestDataRow";
import Swal from "sweetalert2";
import DonorHomeSkeleton from "../../../components/Shared/DonorHomeSkeleton";
import { FaHandHoldingHeart, FaPlus } from "react-icons/fa";
import { Link } from "react-router";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch Requests
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-donation-requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation-requests/my?email=${user?.email}`
      );
      // Priority: pending > inprogress > done > canceled
      const statusPriority = {
        pending: 1,
        inprogress: 2,
        done: 3,
        canceled: 4,
      };
      return data.sort(
        (a, b) =>
          statusPriority[a.donationStatus] - statusPriority[b.donationStatus]
      );
    },
  });

  // Action Handlers
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#111827",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/donation-requests/${id}`);
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted",
              text: "Request removed.",
              icon: "success",
              confirmButtonColor: "#111827",
            });
            await refetch();
            queryClient.invalidateQueries([
              "my-recent-donation-requests",
              user?.email,
            ]);
          }
        } catch (err) {
          Swal.fire("Error!", err.message, "error");
        }
      }
    });
  };

  const handleStatusUpdate = async (id, status, request) => {
    try {
      const updateData = { donationStatus: status };
      if (request?.donorName) updateData.donorName = request.donorName;
      if (request?.donorEmail) updateData.donorEmail = request.donorEmail;

      const { data } = await axiosSecure.patch(
        `/donation-requests/${id}`,
        updateData
      );
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated",
          text: `Status changed to ${status}.`,
          icon: "success",
          confirmButtonColor: "#111827",
        });
        await refetch();
        queryClient.invalidateQueries(["my-donation-requests", user?.email]);
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  // Filter Logic
  const filteredRequests =
    filterStatus === "all"
      ? requests
      : requests.filter((req) => req.donationStatus === filterStatus);

  // Pagination Logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <DonorHomeSkeleton />;

  const tabs = [
    { id: "all", label: "All Requests" },
    { id: "pending", label: "Pending" },
    { id: "inprogress", label: "In Progress" },
    { id: "done", label: "Done" },
    { id: "canceled", label: "Canceled" },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-900 w-full overflow-hidden mt-2">
      <div className="mx-auto space-y-8">
        {/* Header Section - Matched to DonorHome style */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Subtle decorative background similar to DonorHome but red-themed */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                My <span className="text-red-600">Donation</span> Requests
              </h1>
              <p className="text-sm text-gray-500 mt-2 font-medium max-w-lg">
                View and manage your history of blood donation requests.
              </p>
            </div>

            <Link
              to="/dashboard/create-donation-request"
              className="flex items-center justify-center gap-2 px-6 h-12 bg-[#1D3557] hover:bg-red-700 text-white rounded-full font-bold text-sm transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5 duration-300 w-full md:w-auto"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <FaPlus size={10} />
              </div>
              <span>New Request</span>
            </Link>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-4xl p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col relative overflow-hidden">
          {/* Segmented Control Tabs */}
          <div className="bg-gray-50/80 p-1.5 rounded-[1.7rem] inline-flex flex-wrap w-full sm:w-auto mb-6 sticky left-0 top-0 z-10 mx-6 mt-6 border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilterStatus(tab.id);
                  setCurrentPage(1);
                }}
                className={`relative px-6 py-2.5 rounded-3xl text-sm font-bold transition-all duration-300 flex-1 sm:flex-none text-center z-10 ${
                  filterStatus === tab.id
                    ? "text-[#1D3657] shadow-sm ring-1 ring-black/5 bg-white"
                    : "text-gray-500 hover:text-[#1D3657] hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="px-6 pb-8">
            <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-left text-[11px] font-extrabold text-gray-500 uppercase tracking-widest">
                      <th className="px-6 py-5">Recipient</th>
                      <th className="px-6 py-5">Location</th>
                      <th className="px-6 py-5">Date & Time</th>
                      <th className="px-6 py-5 text-center">Group</th>
                      <th className="px-6 py-5 text-center">Status</th>
                      <th className="px-6 py-5">Donor Info</th>
                      <th className="px-6 py-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {currentData.length > 0 ? (
                      currentData.map((request) => (
                        <DonationRequestDataRow
                          key={request._id}
                          request={request}
                          handleDelete={handleDelete}
                          handleStatusUpdate={handleStatusUpdate}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-32 text-center">
                          <div className="flex flex-col items-center justify-center gap-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                              <FaHandHoldingHeart size={32} />
                            </div>
                            <div>
                              <h3 className="text-gray-900 font-bold text-lg">
                                No requests found
                              </h3>
                              <p className="text-gray-400 text-sm mt-1">
                                No {filterStatus !== "all" ? filterStatus : ""}{" "}
                                requests to show.
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {filteredRequests.length > itemsPerPage && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-semibold text-gray-400">
                  Showing {startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, filteredRequests.length)}{" "}
                  of {filteredRequests.length}
                </span>

                <div className="bg-white p-1 rounded-xl border border-gray-100 shadow-sm inline-flex items-center gap-1">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(currentPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-xs font-bold text-gray-500 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-all hover:text-gray-900"
                  >
                    Prev
                  </button>
                  <div className="w-px h-4 bg-gray-100 mx-1"></div>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                        currentPage === i + 1
                          ? "bg-[#1D3657] text-white shadow-md shadow-gray-900/20 scale-105"
                          : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <div className="w-px h-4 bg-gray-100 mx-1"></div>
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-xs font-bold text-gray-500 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-all hover:text-gray-900"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;
