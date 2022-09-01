import { Item } from '../../store/types/item';

export type OrderItem = {
  item: Item;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  date: string;
  items: OrderItem[];
};

export type PostOrderRequest = {
  userId: string;
  items: {
    item: string;
    quantity: number;
  }[];
};
