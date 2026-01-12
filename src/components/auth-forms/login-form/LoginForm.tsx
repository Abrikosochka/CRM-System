import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import type { AuthData } from '../../../types/auth.api.ts';
import './loginForm.css';
import { Typography } from 'antd';
import { signin } from '../../../api/auth-api.ts';
import { useAppDispatch } from '../../../hooks/reduxHooks.ts';
import { auth, loading } from '../../../store/authStore/authSlice.ts';
import { setAccessToken } from '../../../api/axios.ts';
import { useNavigate } from 'react-router';
import type { RuleObject } from "antd/es/form";
import { validateLogin, validatePassword } from '../../../helpers/validation.ts';
import axios from 'axios';
import { useError } from '../../../hooks/useError.tsx';

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showError } = useError();

  const onFinish: FormProps<AuthData>['onFinish'] = async (userAuthData: AuthData) => {
    dispatch(loading(true))
    try {
      const result = await signin(userAuthData);
      localStorage.setItem('token', result.refreshToken);
      setAccessToken(result.accessToken);
      dispatch(auth(true));
      await navigate('/');
    } catch (error) {
      if(axios.isAxiosError(error))
        throw showError(error.response?.data)
    }
    dispatch(loading(false))
  };

  const onFinishFailed: FormProps<AuthData>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='login-form'
      style={{ width: 350 }}
    >
      <Typography.Title level={3}>Войдите в свой аккаунт</Typography.Title>

      <Form.Item<AuthData>
        label="Login"
        name="login"
        rules={[
          {
            validator: (_: RuleObject, value: string): Promise<void> => {
              try {
                const title = value?.trim();
                validateLogin(title);
                return Promise.resolve();
              } catch (error) {
                if (error instanceof Error) {
                  return Promise.reject(error.message);
                }
                return Promise.reject('Ошибка валидации');
              }
            },
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<AuthData>
        label="Password"
        name="password"
        rules={[
          {
            validator: (_: RuleObject, value: string): Promise<void> => {
              try {
                const title = value?.trim();
                validatePassword(title);
                return Promise.resolve();
              } catch (error) {
                if (error instanceof Error) {
                  return Promise.reject(error.message);
                }
                return Promise.reject('Ошибка валидации');
              }
            },
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" size="large" htmlType="submit" style={{marginTop: '20px'}}>
          Войти
        </Button>
      </Form.Item>

      <Typography.Text>Если у вас нет аккаунта, то перейдите на </Typography.Text>
      <Typography.Link href='/auth/registr'>страницу регистрации</Typography.Link>
    </Form>
  )
}

export default LoginForm;
