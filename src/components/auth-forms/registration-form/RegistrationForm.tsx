import React from 'react';
import { useState } from 'react';
import {type FormProps, Image } from 'antd';
import { Button, Form, Input } from 'antd';
import type { UserRegistration } from '../../../types/auth.api.ts';
import { Typography } from 'antd';
import { signup } from '../../../api/auth-api.ts';
import { useNavigate } from 'react-router';
import { useError } from '../../../hooks/errorContext'
import type { RuleObject } from "antd/es/form";
import { validateLogin, validatePassword, validateUsername, createAntValidator } from '../../../helpers/validation'
import { PhoneInput } from '../../phone-input/phoneInput.tsx';
import '../loginForm.css';
import axios from 'axios';
import image from '../../../assets/auth/img.png'

export const RegistrationForm: React.FC = () => {
  const [form] = Form.useForm<UserRegistration>();
  const navigate = useNavigate();
  const { showError } = useError();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish: FormProps<UserRegistration>['onFinish'] = async (UserRegistrationData: UserRegistration): Promise<void> => {
    setIsLoading(true);
    try {
      const cleanPhoneNumber = UserRegistrationData.phoneNumber
        ? UserRegistrationData.phoneNumber.replace(/[^\d+]/g, '')
        : '';

      await signup({
        email: UserRegistrationData.email,
        login: UserRegistrationData.login,
        password: UserRegistrationData.password,
        phoneNumber: cleanPhoneNumber,
        username: UserRegistrationData.username
      });
      navigate('/auth');
    } catch (error: unknown) {
        if(axios.isAxiosError(error))
          showError(error.response?.data)
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <div className='login-form'>
      <div className='login-form__media'>
        <Image className='login-form__image' src={image} preview={false} />
      </div>
      <div className='login-form__form'>
        <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            className='login-form__form-body'
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
                  validator: (_: RuleObject, value: string): Promise<void> => {
                    try {
                      const passwordValue = form.getFieldValue('password');
                      if (value && value !== passwordValue) {
                        return Promise.reject('Пароли не совпадают');
                      }
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
                  validator: (_, value) => {
                    if (!value || value.trim() === '') {
                      return Promise.resolve();
                    }
                    const digits = value?.replace(/\D/g, '') || '';
                    return digits.length === 11
                        ? Promise.resolve()
                        : Promise.reject('Введите номер полностью');
                  },
                },
              ]}
          >
            <PhoneInput />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" size="large" style={{ marginTop: 20 }} loading={isLoading}>
              Зарегистрироваться
            </Button>
          </Form.Item>

          <Typography.Text>Если у вас есть аккаунт, то перейдите на </Typography.Text>
          <Typography.Link href='/auth'>страницу входа</Typography.Link>
        </Form>
      </div>
    </div>
  )
}

export default RegistrationForm;
