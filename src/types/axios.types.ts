import type { AxiosRequestConfig } from 'axios';

export interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean;
}
