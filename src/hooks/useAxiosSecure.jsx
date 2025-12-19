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
    // 1. RESPONSE INTERCEPTOR (Listen for Errors)
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const status = err?.response?.status;

        // 2. If 401 or 403, Log out the user
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );

    // Cleanup to prevent multiple interceptors on re-renders
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosInstance;
};
export default useAxiosSecure;
