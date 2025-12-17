import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonationRequestDataRow from "../../../components/Dashboard/TableRows/DonationRequestDataRow";
import Swal from "sweetalert2";
import {
  FaPlus,
  FaSearch,
  FaArrowRight,
  FaHandHoldingHeart,
  FaHourglassHalf,
  FaHeart,
} from "react-icons/fa";
import { useState } from "react";
import DonorHomeSkeleton from "../../../components/Shared/DonorHomeSkeleton";

const DonorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-recent-donation-requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation-requests/my?email=${user?.email}`
      );
      return data;
    },
  });

  const recentRequests = requests
    .filter((r) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        ["pending", "inprogress"].includes(r.donationStatus) &&
        (r.recipientName?.toLowerCase().includes(lowerSearch) ||
          r.recipientDistrict?.toLowerCase().includes(lowerSearch) ||
          r.recipientUpazila?.toLowerCase().includes(lowerSearch) ||
          r.bloodGroup?.toLowerCase().includes(lowerSearch))
      );
    })
    .slice(0, 3);
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(
    (r) => r.donationStatus === "pending"
  ).length;
  const inProgressRequests = requests.filter(
    (r) => r.donationStatus === "inprogress"
  ).length;
  const doneRequests = requests.filter(
    (r) => r.donationStatus === "done"
  ).length;
  const canceledRequests = requests.filter(
    (r) => r.donationStatus === "canceled"
  ).length;

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
              "my-donation-requests",
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

  if (isLoading) return <DonorHomeSkeleton />;

  return (
    <div className="min-h-screen font-sans text-gray-900 w-full overflow-hidden">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Welcome back,{" "}
                <span className="text-red-600">
                  {user?.displayName?.split(" ")[0] || "Donor"}!
                </span>
              </h1>
              <p className="text-sm text-gray-500 mt-2 font-medium max-w-lg">
                Here's your donation impact overview for today,{" "}
                <span className="text-[#1d3658] font-semibold">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                .
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/dashboard/create-donation-request"
                className="flex items-center justify-center gap-2 px-5 h-10 bg-[#1D3557] hover:bg-red-700 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5 duration-300"
                title="New Request"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <FaPlus size={10} />
                </div>
                <span>New Request</span>
              </Link>
              <Link to="/dashboard/profile" className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg ring-2 ring-gray-50 cursor-pointer hover:ring-red-300 hover:scale-105 duration-400 transition-all">
                <img
                  src={user?.photoURL || "https://i.pravatar.cc/150?img=32"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Total Requests */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-40 group hover:shadow-md transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <FaHandHoldingHeart
                size={80}
                className="text-red-500 transform rotate-12"
              />
            </div>

            <div className="flex justify-between items-start z-10">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <FaHandHoldingHeart size={18} />
              </div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider bg-red-50 px-2 py-1 rounded-full border border-red-100">
                Lifetime Impact
              </span>
            </div>

            <div className="z-10 mt-auto">
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {totalRequests}
              </div>
              <div className="text-xs font-semibold text-gray-500 mt-1">
                Total Donation Requests
              </div>
            </div>
          </div>

          {/* Card 2: Pending */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-40 group hover:shadow-md transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <FaHourglassHalf
                size={80}
                className="text-[#1D3557] transform -rotate-12"
              />
            </div>

            <div className="flex justify-between items-start z-10">
              <div className="w-10 h-10 rounded-full bg-[#E5F1FF] flex items-center justify-center text-[#1D3557]">
                <FaHourglassHalf size={16} />
              </div>
              <div className="bg-[#E5F1FF] text-[#1D3557] text-[10px] font-bold px-2 py-1 rounded-full border border-blue-100 uppercase tracking-wide">
                Pending
              </div>
            </div>

            <div className="z-10 mt-auto flex justify-between items-end">
              <div>
                <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  {pendingRequests}
                </div>
                <div className="text-xs font-semibold text-gray-500 mt-1">
                  Awaiting Requests
                </div>
              </div>
              <Link
                to="/dashboard/my-donation-requests"
                className="w-8 h-8 rounded-full bg-[#1D3557] hover:bg-red-600 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              >
                <FaArrowRight size={10} />
              </Link>
            </div>
          </div>

          {/* Card 3: Stats Bars */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-40 group hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-700 text-sm">
                Request Status
              </h3>
            </div>

            <div className="flex items-end justify-between h-24 px-1 gap-3 pb-1">
              <div className="flex flex-col items-center gap-1 group/bar w-full h-full justify-end">
                <span className="text-[10px] font-bold text-gray-500 mb-0.5">
                  {doneRequests}
                </span>
                <div className="w-full bg-green-50 rounded-t-lg relative overflow-hidden h-[70%]">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-green-500 transition-all duration-1000 w-full"
                    style={{
                      height: `${
                        totalRequests ? (doneRequests / totalRequests) * 100 : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-gray-400">
                  Done
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 group/bar w-full h-full justify-end">
                <span className="text-[10px] font-bold text-gray-500 mb-0.5">
                  {inProgressRequests}
                </span>
                <div className="w-full bg-blue-50 rounded-t-lg relative overflow-hidden h-[80%]">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-[#1D3557] transition-all duration-1000 w-full"
                    style={{
                      height: `${
                        totalRequests
                          ? (inProgressRequests / totalRequests) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-gray-400">
                  In Progress
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 group/bar w-full h-full justify-end">
                <span className="text-[10px] font-bold text-gray-500 mb-0.5">
                  {canceledRequests}
                </span>
                <div className="w-full bg-red-50 rounded-t-lg relative overflow-hidden h-[60%]">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-red-500 transition-all duration-1000 w-full"
                    style={{
                      height: `${
                        totalRequests
                          ? (canceledRequests / totalRequests) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-gray-400">
                  Cancelled
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: CTA */}
          <div className="bg-linear-to-br from-[#D32F2F] to-[#B71C1C] rounded-2xl p-5 relative overflow-hidden h-40 text-white flex flex-col justify-between group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <FaHeart size={35} />
            </div>
            <div className="absolute top-30 left-60 opacity-10 -rotate-36">
              <FaHeart size={35} />
            </div>
            <div className="absolute top-20 left-40 opacity-10 rotate-36">
              <FaHeart size={35} />
            </div>
            <div>
              <div className="text-xl font-bold mb-0.5">Save a Life</div>
              <div className="text-white/80 text-xs">
                Donating blood is an act of solidarity.
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <Link
                to="/dashboard/my-donation-requests"
                className="bg-white text-[#B71C1C] px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors shadow-lg"
              >
                View History
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 w-full overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Requests</h2>

            <div className="relative group w-full md:w-auto">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs group-focus-within:text-gray-600 transition-colors" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-[#F4F5FA] rounded-xl text-xs font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-100 w-full md:w-56 border border-transparent focus:border-red-200 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {requests.length > 0 ? (
            <div className="overflow-x-auto w-full">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="text-left border-b border-gray-100 bg-gray-50/50">
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Group
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Donor Info
                    </th>
                    <th className="px-6 py-4 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentRequests.length > 0 ? (
                    recentRequests.map((request) => (
                      <DonationRequestDataRow
                        key={request._id}
                        request={request}
                        handleDelete={handleDelete}
                        handleStatusUpdate={handleStatusUpdate}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <FaHandHoldingHeart className="text-gray-300 text-2xl" />
                          <p className="text-gray-900 font-bold">
                            No requests found
                          </p>
                          <p className="text-gray-500 text-sm">
                            You have no pending or in-progress requests.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
                <FaSearch size={18} />
              </div>
              <h3 className="text-gray-900 font-bold mb-1">
                No requests found
              </h3>
              <p className="text-gray-400 text-sm">
                You haven't made any donation requests yet.
              </p>
            </div>
          )}

          {requests.length > 3 && (
            <div className="flex justify-center">
              <Link
                to="/dashboard/my-donation-requests"
                className="px-5 py-2.5 bg-[#1D3657] hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-all hover:scale-105 duration-300"
              >
                View All Requests
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorHome;
