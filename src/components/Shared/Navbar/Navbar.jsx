import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { BiDonateHeart } from "react-icons/bi";
import { LiaDonateSolid } from "react-icons/lia";
import { FiLogIn, FiHome } from "react-icons/fi";
import { CiWarning } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import avatarImg from "../../../assets/images/placeholder.jpg";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  // Fetch Notifications
  const { data: notifications = [], refetch: refetchNotifications } = useQuery({
    queryKey: ["notifications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/notifications?email=${user.email}`
      );
      return data;
    },
    // Refetch every minute to keep it fresh
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

  const handleMarkAllRead = async () => {
    try {
      await axiosSecure.patch(
        `/notifications/mark-all-read/user?email=${user?.email}`
      );
      refetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Logout with Confirmation
  const handleLogout = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "Are you sure you want to sign out?",
      icon: "question",
      iconColor: "#E7000B",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#E7000B",
      cancelButtonColor: "#6B7280",
      customClass: {
        popup: "rounded-3xl shadow-2xl",
        title: "text-2xl font-bold text-gray-900",
        htmlContainer: "text-gray-600",
        confirmButton:
          "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
        cancelButton:
          "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        setIsUserMenuOpen(false);
      }
    });
  };

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Nav Menu if clicked outside
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
      // Close User Menu if clicked outside
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      // Close Notification Dropdown if clicked outside
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

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
            isActive
              ? "bg-red-50/80 text-red-500 font-bold"
              : "hover:bg-red-50 hover:text-red-500"
          }`
        }
        onClick={() => setIsNavOpen(false)}
      >
        <FiHome className="text-base lg:text-lg" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/donation-requests"
        className={({ isActive }) =>
          `flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
            isActive
              ? "bg-red-50/80 text-red-500 font-bold"
              : "hover:bg-red-50 hover:text-red-500"
          }`
        }
        onClick={() => setIsNavOpen(false)}
      >
        <BiDonateHeart className="text-base lg:text-lg" />
        <span>Donation Requests</span>
      </NavLink>

      {user && (
        <NavLink
          to="/funding"
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
              isActive
                ? "bg-red-50/80 text-red-500 font-bold"
                : "hover:bg-red-50 hover:text-red-500"
            }`
          }
          onClick={() => setIsNavOpen(false)}
        >
          <LiaDonateSolid className="text-base lg:text-lg" />
          <span>Contribute</span>
        </NavLink>
      )}

      {user && (
        <Link
          to="/search"
          className="flex items-center gap-1.5 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-sm font-semibold"
          onClick={() => setIsNavOpen(false)}
        >
          <CiWarning className="text-lg" />
          <span>Emergency</span>
        </Link>
      )}
    </>
  );

  return (
    <>
      <section>
        <h2 className="flex justify-center bg-[#1D3557] text-xs md:text-sm text-white py-2">
          You don't need to be a doctor to save a life!
        </h2>
      </section>
      <div
        className={`sticky top-0 z-50 transition-all ${
          scrolled || isNavOpen || isUserMenuOpen
            ? "bg-white backdrop-blur-md shadow-xl py-2"
            : "bg-white py-2 shadow-sm"
        }`}
      >
        <Container>
          <div className="flex flex-row items-center justify-between">
            {/* LEFT SIDE: Hamburger (Mobile) + Logo */}
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger Menu Trigger */}
              <div className="md:hidden relative" ref={navRef}>
                <button
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <AiOutlineMenu className="text-2xl" />
                </button>

                {/* Mobile Navigation Dropdown */}
                {isNavOpen && (
                  <div className="absolute top-12 left-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 flex flex-col gap-1 overflow-hidden z-50">
                    {navLinks}
                    {!user && !loading && (
                      <Link
                        to="/login"
                        className="flex items-center gap-1.5 px-3 py-2 text-red-600 font-bold hover:bg-red-50 rounded-lg transition"
                        onClick={() => setIsNavOpen(false)}
                      >
                        <FiLogIn className="text-lg" />
                        <span>Login</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Logo */}
              <Link to="/" className="flex items-center">
                <h1 className="text-4xl md:text-5xl font-extrabold cursor-pointer text-red-600 -mt-2.5 py-2">
                  <span className="text-[#1D3557] text-2xl md:text-3xl">
                    Vein
                  </span>
                  .
                </h1>
              </Link>
            </div>

            {/* RIGHT SIDE: Desktop Links + User Actions */}
            <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
              {/* Desktop Nav Links */}
              <div className="hidden md:flex flex-row gap-2 lg:gap-4 font-medium items-center text-sm lg:text-base text-gray-600">
                {navLinks}
              </div>

              {/* Bell Icon & Notifications */}
              <div
                className="relative flex items-center text-xl text-gray-600"
                ref={notificationRef}
              >
                {user && (
                  <>
                    <button
                      onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                      className="relative cursor-pointer hover:text-red-700 hover:scale-110 transition outline-none"
                    >
                      <FaRegBell />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </button>

                    {/* Notification Dropdown */}
                    {isNotificationOpen && (
                      <div className="absolute right-0 top-10 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                        <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                          <h3 className="font-bold text-gray-800 text-sm">
                            Notifications
                          </h3>
                          {unreadCount > 0 && (
                            <button
                              onClick={handleMarkAllRead}
                              className="text-xs text-red-600 hover:text-red-700 font-medium"
                            >
                              Mark all read
                            </button>
                          )}
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <div
                                key={notification._id}
                                onClick={() =>
                                  handleMarkAsRead(
                                    notification._id,
                                    notification.link
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
                                      notification.createdAt
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                    {" - "}
                                    {new Date(
                                      notification.createdAt
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
                  </>
                )}
              </div>

              {/* User Avatar / Login Button */}
              <div className="relative" ref={userMenuRef}>
                {loading ? (
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 animate-pulse border border-gray-300"></div>
                ) : user ? (
                  /* Logged In: User Avatar & Menu */
                  <>
                    <div
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="cursor-pointer transition hover:scale-105 duration-200"
                    >
                      <img
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full ring-2 ring-red-200 hover:ring-red-300 p-0.5 object-cover transition"
                        referrerPolicy="no-referrer"
                        src={
                          user.photoURL
                            ? user.photoURL
                            : "https://freesvg.org/img/1389952697.png"
                        }
                        alt="profile"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://freesvg.org/img/1389952697.png";
                        }}
                      />
                    </div>

                    {/* User Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-14 w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                          <h3 className="font-bold text-gray-900 text-base truncate">
                            {user.displayName}
                          </h3>
                          <p className="text-gray-500 text-xs truncate">
                            {user.email}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="p-2 flex flex-col gap-1">
                          <Link
                            to="/dashboard"
                            className="px-3 py-2 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 rounded-lg transition font-medium flex items-center gap-3"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <RxDashboard className="text-lg" />
                            Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg transition font-medium flex items-center gap-3"
                          >
                            <LuLogOut className="text-lg" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Logged Out: Login Button (Desktop only) */
                  <div className="hidden md:block">
                    <Link
                      to="/login"
                      className="flex items-center gap-1.5 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition shadow-sm font-semibold"
                    >
                      <FiLogIn className="text-lg" />
                      <span>Login</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
