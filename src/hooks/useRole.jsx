import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user role from DB
  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/role/${user?.email}`);
      return data.role;
    },
    staleTime: Infinity, 
  });

  // return [role, isLoading];
  return ["admin", false]; //(for testing admin dashboard)
  // return ["volunteer", false]; //(for testing volunteer dashboard)
};

export default useRole;
