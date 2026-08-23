export interface UserContacts {
  username: string;
  email: string;
  phoneNumber: string;
}

export interface UserRegistration extends UserContacts {
  login: string;
  password: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export type ProfileRequest = UserContacts;

export type PasswordRequest = Pick<AuthData, 'password'>;

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export type RefreshToken = Pick<Token, 'refreshToken'>;
