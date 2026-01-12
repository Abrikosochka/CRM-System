import type { Profile } from "../types/user.types";
import { instance } from "./axios";

export const getProrile = async (): Promise<Profile> => {
  try {
    const response = await instance({
      method: 'GET',
      url: `/user/profile`,
    })

    return response.data;
  } catch (error) {
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при получении данных пользователя")
  }
}

export const logout = async (): Promise<void> => {
  try {
    await instance({
      method: 'POST',
      url: '/user/logout',
    });
  } catch (error) {
    if (error instanceof Error) throw new Error("Ошибка при выходе: " + error.message);
    else throw new Error("Ошибка при выходе из системы");
  }
}

