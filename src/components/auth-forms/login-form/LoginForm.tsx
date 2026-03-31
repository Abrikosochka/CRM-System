import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Image, Input } from 'antd';
import type { AuthData } from '../../../types/auth.api.ts';
import '../loginForm.css';
import { Typography } from 'antd';
import { signin } from '../../../api/auth-api.ts';
import { useAppDispatch } from '../../../hooks/reduxHooks.ts';
import { auth, loading } from '../../../store/authStore/authSlice.ts';
import { setAccessToken } from '../../../api/axios.ts';
import { useNavigate } from 'react-router';
import { validateLogin, validatePassword, createAntValidator } from '../../../helpers/validation.ts';
import axios from 'axios';
import { useError } from '../../../hooks/errorContext';
import image from '../../../assets/auth/img.png';

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
        showError(error.response?.data)
    } finally {
      dispatch(loading(false))
    }
  };

  return (
    <div className='login-form'>
      <div className='login-form__media'>
        <Image className='login-form__image' src={image} preview={false} />
      </div>
      <div className='login-form__form'>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
          className='login-form__form-body'
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
            <Button type="primary" size="large" htmlType="submit" style={{marginTop: '20px'}}>
              Войти
            </Button>
          </Form.Item>

          <Typography.Text>Если у вас нет аккаунта, то перейдите на </Typography.Text>
          <Typography.Link href='/auth/registr'>страницу регистрации</Typography.Link>
        </Form>
      </div>
    </div>
  )
}

export default LoginForm;
