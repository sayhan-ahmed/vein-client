import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import ScrollToTop from "../components/Shared/ScrollToTop";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white">
      <ScrollToTop />
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 md:ml-64 min-w-0">
        <div className="p-2 sm:p-5 bg-red-50/50 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
