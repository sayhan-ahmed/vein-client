import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";

const VolunteerRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const location = useLocation();

  if (isLoading) return children;

  if (role === "volunteer") return children;

  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default VolunteerRoute;
