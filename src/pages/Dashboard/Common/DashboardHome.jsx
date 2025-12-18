import useRole from "../../../hooks/useRole";
import AdminHome from "../Admin/AdminHome";
import DonorHome from "../Donor/DonorHome";
import DonorHomeSkeleton from "../Donor/components/DonorHomeSkeleton";

const DashboardHome = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return null;

  if (role === "donor") {
    return <DonorHome />;
  }

  if (role === "admin") {
    return <AdminHome />;
  }

  // Default fallback (e.g., for volunteers or others)
  return <DonorHome />;
};

export default DashboardHome;
