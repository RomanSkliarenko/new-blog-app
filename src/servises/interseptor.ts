import axios, { AxiosRequestConfig } from 'axios';

const axiosApiInstance = axios.create({
  baseURL: 'http://51.158.179.21/api/v1/',
});

axiosApiInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (localStorage.token) {
    config.headers.Authorization = `Bearer ${localStorage.token}`;
  }
  return config;
});

export const userToken = {
  set(token: string): void {
    axiosApiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    return undefined;
  },
  unset(): void {
    axiosApiInstance.defaults.headers.common.Authorization = ``;
  },
};

export default axiosApiInstance;
