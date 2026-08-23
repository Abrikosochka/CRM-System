import { createContext, useContext } from 'react';

export interface ErrorContextType {
  showError: (message: unknown) => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
