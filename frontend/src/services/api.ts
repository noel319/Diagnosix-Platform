import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { User, AuthToken, RegisterFormData, LoginFormData, ApiError } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      status: error.response?.status || 500,
      message: 'An error occurred',
      detail: error.response?.data?.detail || error.message,
    };
    return Promise.reject(apiError);
  }
);

// Auth endpoints
export const authApi = {
  register: async (data: RegisterFormData): Promise<User> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginFormData): Promise<AuthToken> => {
    // For login, we need to use form data format as per FastAPI OAuth2PasswordRequestForm
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const response = await api.post('/auth/login', 
      new URLSearchParams({
        username: data.username,
        password: data.password,
      }),
      config
    );
    
    // Store token in localStorage
    localStorage.setItem('token', response.data.access_token);
    
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};