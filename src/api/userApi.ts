import type {
  Profile,
  Role,
  UpdateUserRequest,
  User,
  UsersParams,
  UsersResponse,
} from '../types/user.types';
import { instance } from './axios';

export const getProfile = async (): Promise<Profile> => {
  const response = await instance({
    method: 'GET',
    url: '/users/profile',
  });
  return response.data;
};

export const getUsers = async (params: UsersParams): Promise<UsersResponse> => {
  const response = await instance({
    method: 'GET',
    url: '/users/',
    params,
  });
  return response.data;
};

export const getUser = async (userId: User['id']): Promise<User> => {
  const response = await instance({
    method: 'GET',
    url: `/users/${userId}`,
  });
  return response.data;
};

export const updateUser = async (
  userId: User['id'],
  userData: UpdateUserRequest,
): Promise<User> => {
  const response = await instance({
    method: 'PUT',
    url: `/users/${userId}`,
    data: userData,
  });
  return response.data;
};

export const deleteUser = async (userId: User['id']): Promise<void> => {
  await instance({
    method: 'DELETE',
    url: `/users/${userId}`,
  });
};

export const updateUserBlock = async (
  userId: User['id'],
  isBlocked: boolean,
): Promise<User> => {
  const response = await instance({
    method: 'PUT',
    url: `/users/${userId}/block`,
    data: { isBlocked },
  });
  return response.data;
};

export const updateUserRoles = async (
  userId: User['id'],
  roles: Role[],
): Promise<User> => {
  const response = await instance({
    method: 'PUT',
    url: `/users/${userId}/roles`,
    data: { roles },
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
