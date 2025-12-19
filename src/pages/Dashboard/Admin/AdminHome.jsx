import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaSearch, FaBell, FaCalendarAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import AdminHomeSkeleton from "./components/AdminHomeSkeleton";
import AdminStats from "./components/AdminStats";
import AdminAnalytics from "./components/AdminAnalytics";
import AdminRecentActivity from "./components/AdminRecentActivity";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();

  // Fetch Stats Data
  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ["all-users-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      console.log(data);
      return data;
    },
  });

  const { data: requests = [], isLoading: isRequestsLoading } = useQuery({
    queryKey: ["all-requests-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/donation-requests");
      return data;
    },
  });

  if (isRoleLoading || isUsersLoading || isRequestsLoading)
    return <AdminHomeSkeleton />;

  // Calculate Stats
  const donorCount = users.filter((u) => u.role === "donor").length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const volunteerCount = users.filter((u) => u.role === "volunteer").length;
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(
    (r) => r.donationStatus === "pending"
  ).length;
  const doneRequests = requests.filter(
    (r) => r.donationStatus === "done"
  ).length;
  const canceledRequests = requests.filter(
    (r) => r.donationStatus === "canceled"
  ).length;

  const stats = {
    donorCount,
    totalRequests,
    funding: 0, // Currently no payment
  };

  // Chart Data
  const roleData = [
    { name: "Donors", value: donorCount, color: "#dc2626" },
    { name: "Admins", value: adminCount, color: "#1D3658" },
    { name: "Volunteers", value: volunteerCount, color: "#16a34a" },
  ];

  const requestData = [
    { name: "Pending", value: pendingRequests, fill: "#f59e0b" },
    { name: "Completed", value: doneRequests, fill: "#10b981" },
    { name: "Canceled", value: canceledRequests, fill: "#6b7280" },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-800 w-full pb-12">
      <div className="mx-auto space-y-8">
        {/* Top Greeting Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-4xl shadow-sm md:sticky top-0 z-50">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Welcome back,{" "}
              <span className="text-red-600">
                {user?.displayName?.split(" ")[0] ||
                  (role === "admin" ? "Admin" : "Volunteer")}
              </span>
            </h1>
            <p className="text-xs text-gray-400 font-bold tracking-widest mt-2 uppercase flex items-center gap-2">
              <FaCalendarAlt />
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex justify-center md:justify-end items-center gap-4">
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-green-100 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                {role === "admin" ? "Admin Panel" : "Volunteer Panel"}
              </span>
            </div>

            <button className="relative w-11 h-11 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm group">
              <FaBell className="group-hover:animate-swing" />
              <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            <Link
              to="/dashboard/profile"
              className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-lg ring-1 ring-gray-100 hover:scale-105 transition-transform"
            >
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>

        {/* Components */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
          <AdminStats stats={stats} />
          <AdminAnalytics
            roleData={roleData}
            requestData={requestData}
            totalUsers={users.length}
          />
          <AdminRecentActivity requests={requests} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
