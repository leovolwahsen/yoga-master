import { useContext, useEffect } from "react"
import { AuthContext } from "../utilities/providers/AuthenticationProvider"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useAxiosManagement = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosManagement = axios.create({
    baseURL: 'http://localhost:5000'
  });

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = axiosManagement.interceptors.request.use(function (config) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add a response interceptor
    const responseInterceptor = axiosManagement.interceptors.response.use((response) => response, async (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        await logout();
        navigate('/login');
        throw error;
      }

      throw error;
    });

    return () => {
      axiosManagement.interceptors.request.eject(requestInterceptor);
      axiosManagement.interceptors.response.eject(responseInterceptor);
    }
  }, [logout, navigate, axiosManagement]);

  return axiosManagement;
}
