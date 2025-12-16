import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import Loader from "../components/Shared/Loader";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const location = useLocation();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader />
      </div>
    );

  if (role === "admin") return children;

  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;
