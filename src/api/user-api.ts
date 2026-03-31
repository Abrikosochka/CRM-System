import type { Profile } from "../types/user.types";
import { instance } from "./axios";
import { apiRequest } from "./apiHelpers";

export const getProfile = async (): Promise<Profile> => {
  return apiRequest(
    () => instance({ method: 'GET', url: `/user/profile` }).then(res => res.data),
    "Ошибка при получении данных пользователя"
  );
}

export const logout = async (): Promise<void> => {
  return apiRequest(
    () => instance({ method: 'POST', url: '/user/logout' }).then(() => undefined),
    "Ошибка при выходе из системы"
  );
}

