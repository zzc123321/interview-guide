import request from './request';

export interface AuthUser {
  id: number;
  email: string;
  displayName: string;
  role: 'ADMIN' | 'USER';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = {
  login(payload: LoginRequest): Promise<AuthUser> {
    return request.post<AuthUser>('/api/auth/login', payload);
  },

  me(): Promise<AuthUser> {
    return request.get<AuthUser>('/api/auth/me');
  },

  logout(): Promise<void> {
    return request.post<void>('/api/auth/logout');
  },
};
