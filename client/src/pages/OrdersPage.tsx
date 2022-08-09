// add orderPage and logout to header if logged or log in button
// order - add address nad state
import { OrderRecord } from '../features/orders';
import { useAppSelector } from '../redux/hooks';

export const OrdersPage = () => {
  const orders = useAppSelector((state) => state.user?.orders);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-[repeat(4,_minmax(0,_1fr))] justify-items-center gap-4 w-full font-semibold border-b-4 border-b-btn-primary">
        <span>ID</span>
        <span>Date</span>
        <span>Status</span>
        <span>Expand</span>
      </div>
      {orders?.map((order) => (
        <OrderRecord {...order} key={order.id} />
      ))}
      {orders?.length === 0 && <div>Nothing here!</div>}
    </div>
  );
};
