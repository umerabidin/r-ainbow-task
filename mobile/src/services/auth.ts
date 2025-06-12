import api from './api';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

export const loginUser = async (data: LoginDto) => {
   const response = await api.post('/auth/login', data);
    return response.data;
};

export const registerUser = async (data: RegisterDto) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
export const logout = async () => {
  const response = await api.get('/auth/logout');
  return response.data;
};