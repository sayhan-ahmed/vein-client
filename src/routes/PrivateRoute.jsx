import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Shared/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader />
      </div>
    );
  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

export default PrivateRoute;
