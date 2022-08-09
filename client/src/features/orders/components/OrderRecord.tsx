import { Button } from '../../../components/elements/Button';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { ItemRecord } from '../../../components/ItemRecord';
import { OrderItem } from '../../../services/orders/types';
import { useState } from 'react';

export type OrderRecordProps = {
  id: string;
  date: string;
  items: OrderItem[];
};

export const OrderRecord = ({ id, date, items }: OrderRecordProps) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-[repeat(4,_minmax(0,_1fr))] justify-items-center items-center w-full text-sm border-b">
        <span className="col-span-1">{id.slice(-6)}</span>
        <span className="col-span-1">{date.split('T')[0]}</span>
        <span className="col-span-1">Processing</span>
        <Button
          variant="transparent"
          onClick={() => setIsHidden(!isHidden)}
          className="col-span-1"
        >
          {isHidden && <BiDownArrow size={24} />}
          {!isHidden && <BiUpArrow size={24} />}
        </Button>
      </div>
      <div
        className={`${
          isHidden ? 'max-h-0' : 'max-h-96'
        } overflow-hidden transition-all duration-500 flex flex-col`}
      >
        <ul className="p-4">
          {items.map((item) => (
            <ItemRecord {...item} key={item.id} className="w-full" />
          ))}
        </ul>
        <div className="ml-auto mt-8 border-t">
          Total:{' '}
          {items.reduce(
            (sum, { price, quantity }) => (sum += price * quantity),
            0
          )}
        </div>
      </div>
    </div>
  );
};
