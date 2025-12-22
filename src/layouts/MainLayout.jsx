import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import ScrollToTop from "../components/Shared/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <div className="min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
