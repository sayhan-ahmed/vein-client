// ================= [ PUBLIC AXIOS HOOK ] ================= //
// > Axios instance for public API endpoints.
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
