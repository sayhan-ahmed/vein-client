import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import Loader from "../components/Shared/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading: isAuthLoading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  const isDashboardPath = location.pathname.startsWith("/dashboard");

  if (isAuthLoading || (isDashboardPath && isRoleLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

export default PrivateRoute;
