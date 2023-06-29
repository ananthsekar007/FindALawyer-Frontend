import axios from 'axios';
// import { getToken } from '../hooks/useToken';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5269/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "getToken()";
    const auth = token ? `Bearer ${token}` : '';
    config.headers.common['Authorization'] = auth;
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
