import type { AuthData, Token, UserRegistration } from '../types/auth.api';
import { instance } from './axios';

export const signIn = async (userAuthData: AuthData): Promise<Token> => {
  const response = await instance({
    method: 'POST',
    url: '/auth/signin',
    data: userAuthData,
  });
  return response.data;
};

export const signUp = async (userRegistrationData: UserRegistration): Promise<Token> => {
  const response = await instance({
    method: 'POST',
    url: '/auth/signup',
    data: userRegistrationData,
  });
  return response.data;
};

export const refreshAccessToken = async (refreshTokenValue: string): Promise<Token> => {
  const response = await instance({
    method: 'POST',
    url: '/auth/refresh',
    data: { refreshToken: refreshTokenValue },
  });
  return response.data;
};
