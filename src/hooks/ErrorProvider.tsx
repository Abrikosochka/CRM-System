import type { ReactNode } from 'react';
import { notification } from 'antd';
import axios from 'axios';
import { ErrorContext } from './errorContext';

interface Props {
  children: ReactNode;
}

interface ApiErrorResponse {
  error: string;
}

const formatErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (!error.response) {
      return 'Не удалось подключиться к серверу';
    }

    return error.response.data.error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Неизвестная ошибка';
};

export const ErrorProvider = ({ children }: Props) => {
  const showError = (message: unknown): void => {
    notification.error({
      message: 'Ошибка',
      description: formatErrorMessage(message),
      placement: 'topRight',
    });
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
    </ErrorContext.Provider>
  );
};
