import type { Profile } from '../types/user.types';
import { instance } from './axios';

export const getProfile = async (): Promise<Profile> => {
  const response = await instance({
    method: 'GET',
    url: '/users/profile',
  });
  return response.data;
};

export const performLogout = async (refreshToken: string): Promise<void> => {
  await instance({
    method: 'POST',
    url: '/auth/logout',
    data: { refreshToken },
  });
};
