import api from '../../../shared/lib/axios';
import { LoginFormData, RegisterFormData } from '../../../shared/lib/validation';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    branch: string;
    role: 'member' | 'admin' | 'leader';
  };
  token: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

class AuthService {
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterFormData): Promise<AuthResponse> {
    const { confirmPassword, agreeToTerms, ...registrationData } = userData;
    const response = await api.post<AuthResponse>('/auth/register', registrationData);
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
  }

  async refreshToken(): Promise<{ token: string }> {
    const response = await api.post<{ token: string }>('/auth/refresh');
    return response.data;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/reset-password', {
      token,
      password,
    });
    return response.data;
  }
}

export const authService = new AuthService();
