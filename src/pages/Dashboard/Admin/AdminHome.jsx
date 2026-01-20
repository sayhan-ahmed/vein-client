import { useQuery } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router";
import { useState, useEffect, useRef } from "react";
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
  const navigate = useNavigate();
  const [role, isRoleLoading] = useRole();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  // Close Notification Dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Notifications
  const { data: notifications = [], refetch: refetchNotifications } = useQuery({
    queryKey: ["notifications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/notifications?email=${user.email}`,
      );
      return data;
    },
    refetchInterval: 60000,
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = async (id, link) => {
    try {
      await axiosSecure.patch(`/notifications/${id}`);
      refetchNotifications();
      if (link) {
        navigate(link);
        setIsNotificationOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
    (u) => u.role === "donor" && u.status === "active",
  ).length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const volunteerCount = users.filter((u) => u.role === "volunteer").length;
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(
    (r) => r.donationStatus === "pending",
  ).length;
  const doneRequests = requests.filter(
    (r) => r.donationStatus === "done",
  ).length;
  const canceledRequests = requests.filter(
    (r) => r.donationStatus === "canceled",
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

            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative w-11 h-11 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm group"
              >
                <FaBell className="group-hover:animate-swing" />
                {unreadCount > 0 && (
                  <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-gray-800 text-sm">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification._id}
                          onClick={() =>
                            handleMarkAsRead(
                              notification._id,
                              notification.link,
                            )
                          }
                          className={`p-3 border-b border-gray-50 cursor-pointer transition hover:bg-gray-50 flex gap-3 ${
                            !notification.isRead ? "bg-red-50/30" : ""
                          }`}
                        >
                          <div
                            className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                              !notification.isRead
                                ? "bg-red-500"
                                : "bg-transparent"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <p
                              className={`text-sm ${
                                !notification.isRead
                                  ? "font-bold text-gray-800"
                                  : "text-gray-600"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <span className="text-[10px] text-gray-400 mt-1 block">
                              {new Date(
                                notification.createdAt,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              {" - "}
                              {new Date(
                                notification.createdAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-gray-400 text-sm">
                        No notifications yet
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

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
