import React from 'react';
import { Navigate } from 'react-router-dom';
import ShopCardsGalery from '../components/ShopCardsGalery';
import { LoginForm } from '../features/auth/LoginForm';
import { RegisterForm } from '../features/auth/RegisterForm';
import ErrorPage from '../pages/ErrorPage';
import ItemPage from '../pages/ItemPage';

const ShopPage = React.lazy(() => import('../pages/ShopPage'));
const Layout = React.lazy(() => import('../components/Layout'));
const LandingBanner = React.lazy(() => import('../components/LandingBanner'));

export const publicRoutes = [
  {
    path: '/shop',
    element: <Layout />,
    children: [
      { index: true, element: <LandingBanner /> },
      {
        path: 'auth',
        children: [
          { path: 'login', element: <LoginForm /> },
          { path: 'register', element: <RegisterForm /> },
        ],
      },
      {
        path: 'store',
        element: <ShopPage />,
        children: [
          { index: true, element: <ShopCardsGalery /> },
          { path: ':categoryName', element: <ShopCardsGalery /> },
        ],
      },
      { path: 'products/:itemId', element: <ItemPage /> },
      { path: 'error', element: <ErrorPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/shop" /> },
];
