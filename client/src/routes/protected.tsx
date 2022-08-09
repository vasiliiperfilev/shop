import { Layout } from '../components/Layout';
import { OrdersPage } from '../pages/OrdersPage';

export const protectedRoutes = [
  {
    path: '/shop',
    element: <Layout />,
    children: [{ path: 'user/orders', element: <OrdersPage /> }],
  },
];
