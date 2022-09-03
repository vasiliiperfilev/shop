import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OrderRecord } from '../features/orders';
import { useAppSelector } from '../redux/hooks';
import { setError } from '../redux/reducers/errorReducer';
import orderService from '../services/orders/orderService';
import { Order } from '../services/orders/types';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const [orders, setOrders] = useState<Order[]>([]);

  // TODO: move to separate hook
  useEffect(() => {
    if (user) {
      orderService
        .getOrders()
        .then((orders) => {
          setOrders(orders);
        })
        .catch(() => {
          dispatch(setError('Order loading error'));
          navigate('/shop/error');
        });
    }
  }, []);

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

export default OrdersPage;
