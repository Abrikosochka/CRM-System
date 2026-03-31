import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";
import { refresh } from "./auth-api";
import { store } from "../store";
import { auth } from "../store/authStore/authSlice";

export interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean;
}

let accessToken: string | null = null;

const authPaths = ['/auth/signin', '/auth/signup', '/auth/refresh'];

export const getAccessToken = (): string | null => accessToken;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosInstance> => {
    const original = error.config as RetryAxiosRequestConfig;

    if (authPaths.some((url)=>original.url?.includes(url))) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (original._isRetry) {
      return Promise.reject(error);
    }

    original._isRetry = true;

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


