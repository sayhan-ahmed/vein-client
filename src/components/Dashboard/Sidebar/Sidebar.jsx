import { useLocation, Link } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import Swal from "sweetalert2";

// Icons
import { FaUserGear } from "react-icons/fa6";
import { AiOutlineBars } from "react-icons/ai";
import { ImStatsBars } from "react-icons/im";
import { VscSignOut } from "react-icons/vsc";

// User Menu
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import VolunteerMenu from "./Menu/VolunteerMenu";
import DonorMenu from "./Menu/DonorMenu";

// ================= [ SIDEBAR NAVIGATION ] ================= //
const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(true);
  const [role] = useRole();
  const location = useLocation();

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
      }
    });
  };

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    setActive(true);
  }, [location.pathname]);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Mobile Screen Navbar */}
      <div className="bg-white text-gray-800 flex justify-between md:hidden shadow-sm sticky top-0 z-50">
        <div className="cursor-pointer p-4 font-bold text-xl text-[#1D3557]">
          <Link to="/" className="flex items-center gap-px">
            <img
              src="https://i.postimg.cc/yxz0WknP/pngtree-hand-holding-red-blood-drop-clipart-png-image-13364982.png"
              alt="Vein Logo"
              className="w-9 h-9 mb-1.5"
            />
            <span>Vein.</span>
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className="p-4 focus:outline-none focus:bg-gray-50 text-[#1D3557]"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {!isActive && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={handleToggle}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`z-50 fixed flex flex-col justify-between overflow-x-hidden bg-[#1D3557] w-64 space-y-6 px-2 py-6 inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0 transition-all duration-300 ease-in-out border-r border-white/5 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="px-6 mb-8">
            <Link
              to="/"
              className="flex items-center gap-1 group"
              onClick={() => setActive(true)}
            >
              <img
                src="https://i.postimg.cc/yxz0WknP/pngtree-hand-holding-red-blood-drop-clipart-png-image-13364982.png"
                alt="Vein Logo"
                className="w-11 h-11 mb-1"
              />
              <span className="text-3xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors">
                Vein.
              </span>
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col flex-1 px-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-4 mt-2">
              Menu
            </div>
            <nav className="space-y-1" onClick={() => setActive(true)}>
              {/* Statistics - Visible to Everyone */}
              <MenuItem
                label="Statistics"
                address="/dashboard"
                icon={ImStatsBars}
              />

              {/* Dynamic Menu Based on Role */}
              {role === "admin" && <AdminMenu />}
              {role === "volunteer" && <VolunteerMenu />}
              {role === "donor" && <DonorMenu />}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="px-4 mt-auto">
            <div
              className="bg-white/5 rounded-2xl p-2 mb-4 flex flex-col"
              onClick={() => setActive(true)}
            >
              <MenuItem
                label="Profile"
                address="/dashboard/profile"
                icon={FaUserGear}
              />
              <div className="h-px bg-white/10 my-1 mx-3"></div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 mx-3 my-1 text-gray-400 hover:text-white hover:bg-red-600/10 rounded-xl transition-all duration-300 group"
              >
                <VscSignOut
                  size={20}
                  className="transition-transform group-hover:scale-110"
                />
                <span className="mx-4 text-sm tracking-wide font-medium">
                  Logout
                </span>
              </button>
            </div>

            {/* User Info Micro-view */}
            <div className="flex justify-center py-2 opacity-60">
              <div className="text-[10px] text-gray-400 leading-tight">
                &copy; 2026 Vein. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
