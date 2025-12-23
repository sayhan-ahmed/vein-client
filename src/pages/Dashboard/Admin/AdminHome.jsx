import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaSearch, FaBell, FaCalendarAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import AdminHomeSkeleton from "./components/AdminHomeSkeleton";
import AdminStats from "./components/AdminStats";
import AdminAnalytics from "./components/AdminAnalytics";
import DonationRequestTrendsChart from "./components/DonationRequestTrendsChart";
import RecentUserRegistrations from "./components/RecentUserRegistrations";
import BloodGroupDemand from "./components/BloodGroupDemand";
import AdminRecentActivity from "./components/AdminRecentActivity";
import Swal from "sweetalert2";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();

  // Fetch Stats Data
  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ["all-users-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
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

  const { data: adminStats = {}, isLoading: isAdminStatsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stats");
      return data;
    },
  });

  if (
    isRoleLoading ||
    isUsersLoading ||
    isRequestsLoading ||
    isAdminStatsLoading
  )
    return <AdminHomeSkeleton />;

  // Calculate Stats
  const donorCount = users.filter(
    (u) => u.role === "donor" && u.status === "active"
  ).length;
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
    pendingRequests,
    totalRequests,
    funding: adminStats.funding || 0,
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
            <h1 className="text-4xl text-center md:text-start font-extrabold text-gray-900 tracking-tight">
              Welcome back,{" "}
              <span className="text-red-600">
                {user?.displayName?.split(" ")[0] ||
                  (role === "admin" ? "Admin" : "Volunteer")}
              </span>
            </h1>
            <p className="text-xs justify-center md:justify-start text-gray-400 font-bold tracking-widest mt-2 uppercase flex items-center gap-2">
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

            <button
              onClick={() => {
                Swal.fire({
                  title: "Notifications",
                  text: "You have no new notifications at this time.",
                  icon: "info",
                  iconColor: "#3B82F6",
                  confirmButtonText: "OK",
                  confirmButtonColor: "#E7000B",
                  customClass: {
                    popup: "rounded-3xl shadow-2xl",
                    title: "text-2xl font-bold text-gray-900",
                    htmlContainer: "text-gray-600",
                    confirmButton:
                      "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
                  },
                });
              }}
              className="relative w-11 h-11 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm group"
            >
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
          <DonationRequestTrendsChart requests={requests} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentUserRegistrations users={users} />
            <BloodGroupDemand requests={requests} />
          </div>
          <AdminRecentActivity requests={requests} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
