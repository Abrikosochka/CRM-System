import LoginForm from "../../components/auth-forms/login-form/LoginForm";
import "./loginPage.css";
import RegistrationForm from "../../components/auth-forms/registration-form/RegistrationForm";
import {Route, Routes, useNavigate} from "react-router";
import {useCallback, useEffect, useRef, useState} from "react";
import {Modal} from "antd";

export const LoginPage = () => {
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const [countdown, setCountdown] = useState<number>(5);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const clearCountdownInterval = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const redirectToLogin = useCallback(() => {
    clearCountdownInterval();
    setIsSuccessModalOpen(false);
    setCountdown(5);
    navigate('/auth');
  }, [clearCountdownInterval, navigate]);

  const handleRegistrationSuccess = useCallback(() => {
    setIsSuccessModalOpen(true);
  }, []);

  useEffect(() => {
    if (!isSuccessModalOpen) return;
    setCountdown(5);
    intervalId.current = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearCountdownInterval();
  }, [clearCountdownInterval, isSuccessModalOpen]);

  useEffect(() => {
    if (isSuccessModalOpen && countdown === 0) {
      redirectToLogin();
    }
  }, [countdown, isSuccessModalOpen, redirectToLogin]);

  return (
    <div className="login-page-layout" >
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registr" element={<RegistrationForm onSuccess={handleRegistrationSuccess} />} />
      </Routes>
      <Modal
        title='Регистрация прошла успешно'
        open={isSuccessModalOpen}
        onCancel={redirectToLogin}
        onOk={redirectToLogin}
        okText='Перейти сейчас'
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>Вы будете перемещены на страницу входа через {countdown} сек.</p>
      </Modal>
    </div>
  )
}

export default LoginPage;
