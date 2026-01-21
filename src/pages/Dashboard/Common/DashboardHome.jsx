import useRole from "../../../hooks/useRole";
import AdminHome from "../Admin/AdminHome";
import DonorHome from "../Donor/DonorHome";

const DashboardHome = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return null;

  if (role === "donor") {
    return <DonorHome />;
  }

  if (role === "admin" || role === "volunteer") {
    return <AdminHome />;
  }

  // Default fallback (e.g., for others)
  return <DonorHome />;
};

export default DashboardHome;
