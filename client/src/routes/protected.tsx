import React from 'react';
import { Layout } from '../components/Layout';

const OrdersPage = React.lazy(() => import('../pages/OrdersPage'));

export const protectedRoutes = [
  {
    path: '/shop',
    element: <Layout />,
    children: [{ path: 'user/orders', element: <OrdersPage /> }],
  },
];
