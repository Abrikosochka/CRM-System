import type { AuthData, Token, UserRegistration } from "../types/auth.api";
import { instance } from "./axios";
import axios from "axios";

export const signin = async (userAuthData: AuthData): Promise<Token> => {
  try {
    const response = await instance({
      method: 'POST',
      url: `/auth/signin`,
      data: userAuthData,
    })
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при авторизации пользователя")
  }
}

export const signup = async (userRegistrationData: UserRegistration): Promise<Token> => {
  try {
    const response = await instance({
      method: 'POST',
      url: `/auth/signup`,
      data: userRegistrationData,
    })
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при регистрации пользователя")
  }
}

export const refresh = async (refreshToken: string): Promise<Token> => {
  try {
    const response = await instance({
      method: 'POST',
      url: '/auth/refresh',
      data: { refreshToken },
    })
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    if (error instanceof Error) throw new Error("Ошибка HTTP: " + error.message);
    else throw new Error("Ошибка при обновлении токена")
  }
}