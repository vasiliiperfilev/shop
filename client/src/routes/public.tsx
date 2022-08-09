import { Navigate } from 'react-router-dom';
import LandingBanner from '../components/LandingBanner';
import { Layout } from '../components/Layout';
import ShopCardsGalery from '../components/ShopCardsGalery';
import { LoginForm } from '../features/auth/LoginForm';
import { RegisterForm } from '../features/auth/RegisterForm';
import ErrorPage from '../pages/ErrorPage';
import ItemPage from '../pages/ItemPage';
import ShopPage from '../pages/ShopPage';

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
