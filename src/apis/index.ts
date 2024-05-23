import axios, { AxiosInstance } from 'axios';
import useAppDispatch from 'src/hooks/useAppDispatch';
import store from 'src/stores';
import { setLoading } from 'src/stores/loading/loadingSlice';

const setupAxiosInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
};

const authAxiosInstance = axios.create({
  baseURL: 'http://localhost:3100/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const serviceAxiosInstance = axios.create({
  baseURL: 'http://localhost:3200/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

setupAxiosInterceptors(authAxiosInstance);
setupAxiosInterceptors(serviceAxiosInstance);

const axiosInstanceObj = {
  serviceAxiosInstance,
  authAxiosInstance,
};

export default axiosInstanceObj;
