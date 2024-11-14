import axios from "axios";
import { useEffect } from "react";

export const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/'
    // baseURL: 'https://yoga-master-ln96.onrender.com'
  });

  // Interceptors
  useEffect(() => {
    // request Interceptor
    const requestInterceptor = axios.interceptors.request.use((config) => {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    // response Interceptor
    const responseInterceptor = axios.interceptors.response.use((response) => {
      return response;
    }, function (error) {
      return Promise.reject(error);
    });

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    }
  }, [axiosInstance])
  return axiosInstance;
}
