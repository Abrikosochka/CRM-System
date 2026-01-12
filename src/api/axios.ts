import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";
import { refresh } from "./auth-api";
import { store } from "../store";
import { auth } from "../store/authStore/authSlice";

export interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean;
}

export let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosInstance> => {
    const original = error.config as AxiosRequestConfig;

    if (original.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    try {
      const { accessToken: newToken, refreshToken: newRefreshToken } = await refresh(localStorage.getItem('token') as string);

      setAccessToken(newToken);
      localStorage.setItem('token', newRefreshToken);

      if (!original.headers) original.headers = {};
      original.headers.Authorization = "Bearer " + newToken;

      return instance(original);
    } catch (err) {
      setAccessToken(null);
      localStorage.removeItem('token');
      store.dispatch(auth(false));
      return Promise.reject(err);
    }
  }
);


