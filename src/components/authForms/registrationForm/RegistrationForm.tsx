import React, { useState } from 'react';
import { type FormProps, Image, Button, Form, Input, Space, Typography } from 'antd';
import type { UserRegistration } from '../../../types/auth.api.ts';
import { signUp } from '../../../api/authApi.ts';
import { useError } from '../../../hooks/errorContext';
import {
  validateLogin,
  validatePassword,
  validateUsername,
  createAntValidator,
} from '../../../helpers/validation';
import { PhoneInput } from '../../../shared/ui/phoneInput/PhoneInput.tsx';
import '../loginForm/loginForm.css';
import axios from 'axios';
import image from '../../../assets/auth/img.png';

interface Props {
  onSuccess: () => void;
}

export const RegistrationForm: React.FC<Props> = ({ onSuccess }) => {
  const [form] = Form.useForm<UserRegistration>();
  const { showError } = useError();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp: FormProps<UserRegistration>['onFinish'] = async (
    registrationData: UserRegistration,
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const cleanPhoneNumber = registrationData.phoneNumber
        ? registrationData.phoneNumber.replace(/[^\d+]/g, '')
        : '';

      await signUp({
        email: registrationData.email,
        login: registrationData.login,
        password: registrationData.password,
        phoneNumber: cleanPhoneNumber,
        username: registrationData.username,
      });

      onSuccess();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showError(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__media">
        <Image className="login-form__image" src={image} preview={false} />
      </div>
      <div className="login-form__form">
        <Form
          form={form}
          name="signUp"
          initialValues={{ remember: true }}
          onFinish={handleSignUp}
          layout="vertical"
          autoComplete="off"
          className="login-form__form-body"
        >
          <Typography.Title level={3}>Создайте новый аккаунт</Typography.Title>

          <Form.Item<UserRegistration>
            label="Логин"
            name="login"
            rules={[
              {
                required: true,
                validator: createAntValidator(validateLogin),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<UserRegistration>
            label="Имя пользователя"
            name="username"
            rules={[
              {
                required: true,
                validator: createAntValidator(validateUsername),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<UserRegistration>
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                validator: createAntValidator(validatePassword),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Повторите пароль"
            name="repeatPassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Повторите пароль',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  void rule;
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<UserRegistration>
            label="Email"
            name="email"
            rules={[{ type: 'email', required: true, message: 'Введите корректный email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Номер телефона"
            rules={[
              {
                validator(rule, value) {
                  void rule;
                  if (!value || value.trim() === '') {
                    return Promise.resolve();
                  }
                  const digits = value?.replace(/\D/g, '') || '';
                  return digits.length === 11
                    ? Promise.resolve()
                    : Promise.reject(new Error('Введите номер полностью'));
                },
              },
            ]}
          >
            <PhoneInput />
          </Form.Item>

          <Form.Item label={null}>
            <Space direction="vertical" size="large">
              <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
                Зарегистрироваться
              </Button>
            </Space>
          </Form.Item>

          <Typography.Text>Если у вас есть аккаунт, то перейдите на </Typography.Text>
          <Typography.Link href="/auth">страницу входа</Typography.Link>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;
