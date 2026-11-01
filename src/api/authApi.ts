import type { AuthData, Token, TokenResponse, UserRegistration } from '../types/auth.api';
import { instance } from './axios';

const normalizeToken = (token: TokenResponse): Token => ({
  accessToken: token.AccessToken,
  refreshToken: token.RefreshToken,
});

export const signIn = async (userAuthData: AuthData): Promise<Token> => {
  const response = await instance<TokenResponse>({
    method: 'POST',
    url: '/auth/signin',
    data: userAuthData,
  });
  return normalizeToken(response.data);
};

export const signUp = async (userRegistrationData: UserRegistration): Promise<Token> => {
  const response = await instance<TokenResponse>({
    method: 'POST',
    url: '/auth/signup',
    data: userRegistrationData,
  });
  return normalizeToken(response.data);
};

export const refreshAccessToken = async (refreshTokenValue: string): Promise<Token> => {
  const response = await instance<TokenResponse>({
    method: 'POST',
    url: '/auth/refresh',
    data: { refreshToken: refreshTokenValue },
  });
  return normalizeToken(response.data);
};
