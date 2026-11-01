export type Role = 'user' | 'admin' | 'moderator' | 'manager';

export interface User {
  id: number;
  userName: string;
  email: string;
  phoneNumber?: string;
  birthday?: string;
  roles: Role[];
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Profile = User;

export type UsersOrderBy = 'id' | 'userName' | 'email' | 'createdAt';
export type UsersOrderDirection = 'asc' | 'desc';

export interface UsersParams {
  limit: number;
  offset: number;
  search?: string;
  orderBy: UsersOrderBy;
  orderDir: UsersOrderDirection;
  isBlocked?: boolean;
}

export interface UsersResponse {
  data: User[];
  total: number;
  meta: {
    limit: number;
    offset?: number;
    search?: string;
    orderBy: UsersOrderBy;
    orderDir: UsersOrderDirection;
  };
}

export interface UpdateUserRequest {
  userName: string;
  email: string;
  phoneNumber: string;
  birthday?: string;
}
