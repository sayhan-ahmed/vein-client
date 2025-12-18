import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaHandHoldingHeart,
  FaHourglassHalf,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";
import DonorHomeSkeleton from "../../../pages/Dashboard/Donor/components/DonorHomeSkeleton";

const DonorStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-recent-donation-requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation-requests/my?email=${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) return <DonorHomeSkeleton />;

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

  return (
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
          <h3 className="font-bold text-gray-700 text-sm">Request Status</h3>
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
            <span className="text-[10px] font-bold text-gray-400">Done</span>
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
                    totalRequests ? (canceledRequests / totalRequests) * 100 : 0
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
  );
};
export default DonorStatistics;
