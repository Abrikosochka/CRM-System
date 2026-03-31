import type { ReactNode } from 'react';
import { useState } from 'react';
import { Modal } from 'antd';
import { ErrorContext } from './errorContext';

interface ErrorModalProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const ErrorModal = ({ message, visible, onClose }: ErrorModalProps) => {
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

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
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

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <ErrorModal
        message={errorMessage}
        visible={isErrorModalVisible}
        onClose={handleCloseErrorModal}
      />
    </ErrorContext.Provider>
  );
};
