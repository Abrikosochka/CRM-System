import React, { createContext, useContext, useState } from 'react';
import { Modal } from 'antd';

interface ErrorContextType {
  showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export const ErrorModal: React.FC<{
  message: string;
  visible: boolean;
  onClose: () => void;
}> = ({ message, visible, onClose }) => {
  return (
    <Modal
      title="Ошибка"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <p>{message}</p>
    </Modal>
  );
};

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState<boolean>(false);

  const showError = (message: string): void => {
    setErrorMessage(message);
    setIsErrorModalVisible(true);
  };

  const handleCloseErrorModal = (): void => {
    setIsErrorModalVisible(false);
    setErrorMessage('');
  };

  const value = {
    showError,
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
      <ErrorModal
        message={errorMessage}
        visible={isErrorModalVisible}
        onClose={handleCloseErrorModal}
      />
    </ErrorContext.Provider>
  );
};
