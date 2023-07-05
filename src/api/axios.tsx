import axios from 'axios';
import { API_BASE_URL } from '../constants/AppConstants';
import { getClientAuthToken, getLawyerAuthToken } from '../constants/LocalStorage';
// import { getToken } from '../hooks/useToken';

const axiosClientInstance = axios.create({
  baseURL: API_BASE_URL,
});

const axiosLawyerInstance = axios.create({
  baseURL: API_BASE_URL
})

axiosClientInstance.interceptors.request.use(
  (config) => {
    const token = getClientAuthToken();
    const auth = token ? `Bearer ${token}` : '';
    config.headers.common['Authorization'] = auth;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosLawyerInstance.interceptors.request.use(
  (config) => {
    const token = getLawyerAuthToken();
    const auth = token ? `Bearer ${token}` : '';
    config.headers.common['Authorization'] = auth;
    return config;
  },
  (error) => Promise.reject(error),
);

export {axiosClientInstance, axiosLawyerInstance};
