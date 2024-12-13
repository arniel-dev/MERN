import { useEffect } from "react";
// Axios
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Redux

// Hook
import { useCookies } from "react-cookie";

const useAxiosPrivate = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
