import { Item } from '../../store/types/item';

export interface OrderItem extends Item {
  quantity: number;
}

export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
};

export type PostOrderRequest = Omit<Order, 'id'>;
