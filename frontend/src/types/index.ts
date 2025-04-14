export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  full_name?: string;
  role: UserRole;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface ApiError {
  status: number;
  message: string;
  detail?: string;
}