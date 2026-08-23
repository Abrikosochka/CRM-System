import axios, { AxiosError, type AxiosInstance } from 'axios';
import { refreshAccessToken } from './authApi';
import { store } from '../store';
import { auth } from '../store/authStore/authSlice';
import { getAccessToken, setAccessToken } from './tokenService';
import type { RetryAxiosRequestConfig } from '../types/axios.types';

const authPaths = ['/auth/signin', '/auth/signup', '/auth/refresh'];

export { getAccessToken, setAccessToken } from './tokenService';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError): Promise<AxiosInstance> => {
    const failedRequestConfig = error.config as RetryAxiosRequestConfig | undefined;

    if (!failedRequestConfig) {
      return Promise.reject(error);
    }

    if (authPaths.some((url) => failedRequestConfig.url?.includes(url))) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (failedRequestConfig._isRetry) {
      return Promise.reject(error);
    }

    failedRequestConfig._isRetry = true;

    const storedRefreshToken = localStorage.getItem('token');
    if (!storedRefreshToken) {
      setAccessToken(null);
      store.dispatch(auth(false));
      return Promise.reject(error);
    }

    try {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refreshAccessToken(storedRefreshToken);

      setAccessToken(newAccessToken);
      localStorage.setItem('token', newRefreshToken);

      if (!failedRequestConfig.headers) {
        failedRequestConfig.headers = {};
      }
      failedRequestConfig.headers.Authorization = `Bearer ${newAccessToken}`;

      return instance(failedRequestConfig);
    } catch (refreshError) {
      setAccessToken(null);
      localStorage.removeItem('token');
      store.dispatch(auth(false));
      return Promise.reject(refreshError);
    }
  },
);
