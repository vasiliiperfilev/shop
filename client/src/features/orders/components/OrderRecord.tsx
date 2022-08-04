import { Item } from '../types';

export type OrderRecordProps = {
  id: string;
  date: string;
  items: Item[];
};

const OrderRecord = ({ id, date, items }: OrderRecordProps) => {};
