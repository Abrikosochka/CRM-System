import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Space, Typography } from 'antd';
import type { AuthData } from '../../../types/auth.api.ts';
import './loginForm.css';
import { signIn } from '../../../api/authApi.ts';
import { useAppDispatch } from '../../../store/reduxHooks.ts';
import { auth, loading } from '../../../store/authStore/authSlice.ts';
import { setAccessToken } from '../../../api/tokenService.ts';
import { useNavigate } from 'react-router';
import { validateLogin, validatePassword, createAntValidator } from '../../../helpers/validation.ts';
import { useError } from '../../../hooks/errorContext';
import image from '../../../assets/auth/img.png';

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showError } = useError();

  const handleSignIn: FormProps<AuthData>['onFinish'] = async (credentials: AuthData) => {
    dispatch(loading(true));
    try {
      const result = await signIn(credentials);
      localStorage.setItem('token', result.refreshToken);
      setAccessToken(result.accessToken);
      dispatch(auth(true));
      await navigate('/');
    } catch (error) {
      showError(error);
    } finally {
      dispatch(loading(false));
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__media">
        <img className="login-form__image" src={image} alt="Login" />
      </div>
      <div className="login-form__form">
        <Form
          name="signIn"
          initialValues={{ remember: true }}
          onFinish={handleSignIn}
          layout="vertical"
          autoComplete="off"
          className="login-form__form-body"
        >
          <Typography.Title level={3}>Войдите в свой аккаунт</Typography.Title>

          <Form.Item<AuthData>
            label="Логин"
            name="login"
            rules={[
              {
                validator: createAntValidator(validateLogin),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<AuthData>
            label="Пароль"
            name="password"
            rules={[
              {
                validator: createAntValidator(validatePassword),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Button type="primary" size="large" htmlType="submit" style={{ width: '30%' }}>
                Войти
              </Button>
            </Space>
          </Form.Item>

          <Typography.Text>Если у вас нет аккаунта, то перейдите на </Typography.Text>
          <Typography.Link href="/auth/registr">страницу регистрации</Typography.Link>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
