import { ItemResponse } from './item.response';

export interface Item extends Omit<ItemResponse, 'id'> {
  id: string;
  link: string;
}
