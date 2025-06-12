import { Discount } from "./discount";

export interface User {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  discount?: Discount
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}