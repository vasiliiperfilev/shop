import { Item } from '../../store/types';

export type OrderItem = {
  item: Item;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  createdAt: string;
  items: OrderItem[];
};

export type PostOrderRequest = {
  items: {
    item: string;
    quantity: number;
  }[];
};
