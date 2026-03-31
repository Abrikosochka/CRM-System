import LoginForm from "../../components/auth-forms/login-form/LoginForm";
import "./loginPage.css";
import RegistrationForm from "../../components/auth-forms/registration-form/RegistrationForm";
import { Route, Routes } from "react-router";

export const LoginPage = () => {
  return (
    <div className="login-page-layout" >
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registr" element={<RegistrationForm />} />
      </Routes>
    </div>
  )
}

export default LoginPage;
