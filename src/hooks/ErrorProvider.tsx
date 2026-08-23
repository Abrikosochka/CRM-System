import type { ReactNode } from 'react';
import { notification } from 'antd';
import { ErrorContext } from './errorContext';

interface Props {
  children: ReactNode;
}

const formatErrorMessage = (message: unknown): string => {
  if (typeof message === 'string') {
    return message;
  }
  if (message && typeof message === 'object' && 'message' in message) {
    return String((message as { message: unknown }).message);
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
