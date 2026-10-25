export interface Profile {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  birthday?: string;
  roles: string[];
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}
