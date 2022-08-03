export type RegisterRequest = {
  email: string;
  password: string;
  address: string;
};

export type User = {
  id: string;
  email: string;
  address: string;
  orders: string[];
  token: string;
};
