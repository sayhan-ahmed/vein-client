import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import Loader from "../components/Shared/Loader";

const VolunteerRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const location = useLocation();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader />
      </div>
    );

  if (role === "volunteer") return children;

  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default VolunteerRoute;
