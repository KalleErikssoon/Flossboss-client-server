// axiosInterceptor.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", // Replace with your actual base URL
});

export const setupAxiosInterceptor = (triggerError) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        axios.isAxiosError(error) &&
        (!error.response || error.response?.status >= 500)
      ) {
        triggerError(true);
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
