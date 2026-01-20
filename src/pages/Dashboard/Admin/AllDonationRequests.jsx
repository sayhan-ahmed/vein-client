import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import DonationRequestDataRow from "../../../components/Dashboard/TableRows/DonationRequestDataRow";
import Swal from "sweetalert2";
import AllDonationRequestsSkeleton from "./components/AllDonationRequestsSkeleton";
import { FaHandHoldingHeart, FaFilter, FaInbox } from "react-icons/fa";

const AllDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [role, isRoleLoading] = useRole();
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch All Requests
  const {
    data: requests = [],
    isLoading: isDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-donation-requests-admin"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/donation-requests");
      // Priority: pending > inprogress > done > canceled
      const statusPriority = {
        pending: 1,
        inprogress: 2,
        done: 3,
        canceled: 4,
        expired: 5,
      };
      return data.sort(
        (a, b) =>
          statusPriority[a.donationStatus] - statusPriority[b.donationStatus],
      );
    },
  });

  // Action Handlers
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      iconColor: "#DC2626",
      position: "center",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#1D3658",
      customClass: {
        popup: "rounded-3xl shadow-2xl",
        title: "text-2xl font-bold text-gray-900",
        htmlContainer: "text-gray-600",
        confirmButton:
          "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
        cancelButton:
          "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/donation-requests/${id}`);
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted",
              text: "Request removed successfully.",
              icon: "success",
              iconColor: "#10B981",
              position: "center",
              confirmButtonText: "Great!",
              confirmButtonColor: "#1D3658",
              customClass: {
                popup: "rounded-3xl shadow-2xl",
                title: "text-2xl font-bold text-gray-900",
                htmlContainer: "text-gray-600",
                confirmButton:
                  "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
              },
            });
            await refetch();
            queryClient.invalidateQueries(["all-donation-requests-admin"]);
            queryClient.invalidateQueries(["all-requests-stats"]);
          }
        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            iconColor: "#DC2626",
            position: "center",
            confirmButtonText: "Okay",
            confirmButtonColor: "#1D3658",
            customClass: {
              popup: "rounded-3xl shadow-2xl",
              title: "text-2xl font-bold text-gray-900",
              htmlContainer: "text-gray-600",
              confirmButton:
                "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
            },
          });
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
        updateData,
      );
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated",
          text: `Status changed to ${status} successfully.`,
          icon: "success",
          iconColor: "#10B981",
          position: "center",
          confirmButtonText: "Great!",
          confirmButtonColor: "#1D3658",
          customClass: {
            popup: "rounded-3xl shadow-2xl",
            title: "text-2xl font-bold text-gray-900",
            htmlContainer: "text-gray-600",
            confirmButton:
              "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
          },
        });
        await refetch();
        queryClient.invalidateQueries(["all-donation-requests-admin"]);
        queryClient.invalidateQueries(["all-requests-stats"]);
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        iconColor: "#DC2626",
        position: "center",
        confirmButtonText: "Okay",
        confirmButtonColor: "#1D3658",
        customClass: {
          popup: "rounded-3xl shadow-2xl",
          title: "text-2xl font-bold text-gray-900",
          htmlContainer: "text-gray-600",
          confirmButton:
            "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
        },
      });
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
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isRoleLoading || isDataLoading) return <AllDonationRequestsSkeleton />;

  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "inprogress", label: "Progress" },
    { id: "done", label: "Done" },
    { id: "canceled", label: "Cancel" },
    { id: "expired", label: "Expired" },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-900 w-full mt-2 pb-10">
      <div className="mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/5 transition-colors duration-700"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                All <span className="text-red-600">Donation</span> Requests
                <FaInbox className="text-slate-200 mt-1" size={36} />
              </h1>
              <p className="text-sm text-gray-500 mt-2 font-medium max-w-lg">
                Global oversight of all blood donation requests across the
                platform.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-2xl shadow-inner">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-600 border border-red-50">
                <FaHandHoldingHeart size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Total Requests
                </p>
                <p className="text-xl font-black text-gray-900 tracking-tighter leading-none">
                  {requests.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-4xl p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col relative min-h-[600px]">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 mt-6 mb-6">
            <div className="bg-gray-50/80 p-1.5 rounded-2xl md:rounded-full grid grid-cols-3 sm:flex sm:flex-wrap border border-gray-100 shadow-inner gap-1.5 w-full md:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setFilterStatus(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`relative px-2 sm:px-6 py-2.5 rounded-xl md:rounded-full text-[10px] sm:text-xs font-black uppercase tracking-tight sm:tracking-normal transition-all duration-300 flex items-center justify-center z-10 ${
                    filterStatus === tab.id
                      ? "text-white shadow-lg bg-[#1D3657] scale-105"
                      : "text-gray-400 hover:text-[#1D3657] hover:bg-white/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <FaFilter size={10} className="text-red-500" />
              <span>
                Showing {currentData.length} of {filteredRequests.length}{" "}
                Requests
              </span>
            </div>
          </div>

          {/* Table Container */}
          <div className="px-0 sm:px-6 pb-8">
            <div className="rounded-none sm:rounded-3xl md:rounded-4xl border-y sm:border border-gray-100 overflow-hidden bg-white/50 sm:bg-white">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="hidden md:table-header-group">
                    <tr className="hidden md:table-row bg-slate-50/80 border-b border-gray-100 text-left text-[11px] font-black text-slate-500 uppercase tracking-widest">
                      <th className="px-3 sm:px-6 py-6 min-w-[140px]">
                        Recipient
                      </th>
                      <th className="px-3 sm:px-6 py-6 min-w-[140px]">
                        Location
                      </th>
                      <th className="px-3 sm:px-6 py-6 text-center min-w-[160px]">
                        Date & Time
                      </th>
                      <th className="px-3 sm:px-6 py-6 text-center">Group</th>
                      <th className="px-3 sm:px-6 py-6 text-center">Status</th>
                      <th className="px-3 sm:px-6 py-6 min-w-[180px]">
                        Donor Info
                      </th>
                      <th className="px-3 sm:px-6 py-6 text-right pr-10">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50/80">
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
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                              <FaInbox size={32} />
                            </div>
                            <div>
                              <h3 className="text-gray-900 font-bold text-lg leading-tight">
                                No Requests Found
                              </h3>
                              <p className="text-gray-400 text-sm mt-1">
                                No {filterStatus !== "all" ? filterStatus : ""}{" "}
                                donation requests to show.
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
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Page {currentPage} of {totalPages}
                </span>

                <div className="bg-white p-1 rounded-2xl border border-gray-100 shadow-sm inline-flex items-center gap-1">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(currentPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-xs font-bold text-[#1D3657] rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all active:scale-95"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                        currentPage === i + 1
                          ? "bg-[#1D3657] text-white shadow-lg shadow-blue-900/20 scale-110"
                          : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-xs font-bold text-[#1D3657] rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all active:scale-95"
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

export default AllDonationRequests;
