import { Order } from '../../orders/types';

export type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  address: string;
  orders: Order[];
  token: string;
};
