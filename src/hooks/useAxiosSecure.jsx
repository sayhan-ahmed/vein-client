// ================= [ SECURE AXIOS HOOK ] ================= //
// > Secure Axios instance with auth interceptors.
import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // > Interceptor: Catch auth errors and force logout.
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const status = err?.response?.status;

        // > Logic: Log out on 401/403.
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(err);
      },
    );

    // Cleanup to prevent multiple interceptors on re-renders
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosInstance;
};
export default useAxiosSecure;
