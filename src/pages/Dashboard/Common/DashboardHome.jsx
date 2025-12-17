import useRole from "../../../hooks/useRole";
import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import DonorHome from "../Donor/DonorHome";
import DonorHomeSkeleton from "../../../components/Shared/DonorHomeSkeleton";

const DashboardHome = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <DonorHomeSkeleton />;

  if (role === "donor") {
    return <DonorHome />;
  }

  // Default to Admin Stats (or Volunteer if applicable in future)
  return (
    <div>
      <AdminStatistics />
    </div>
  );
};

export default DashboardHome;
