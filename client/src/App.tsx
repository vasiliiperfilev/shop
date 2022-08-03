import './styles/tailwind.css';
import './styles/globals.scss';
import { useEffect } from 'react';
import { initializeProducts } from './redux/shopReducer';
import { useAppDispatch } from './redux/hooks';
import { initilizeCategories } from './redux/categoriesReduces';
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import LandingBanner from './components/LandingBanner';
import ShopCardsGalery from './components/ShopCardsGalery';
import ItemPage from './pages/ItemPage';
import ShopPage from './pages/ShopPage';
import ErrorPage from './pages/ErrorPage';
import history from './utils/history';
import { Layout } from './components/Layout';
import { Spinner } from './components/elements/Spinner';
import React from 'react';
import { RegisterForm } from './features/auth/RegisterForm';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeProducts());
  }, []);

  useEffect(() => {
    dispatch(initilizeCategories());
  }, []);

  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }
    >
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/shop" element={<Layout />}>
            <Route index element={<LandingBanner />} />
            <Route path="auth">
              {/* <Route path="login" element={<LoginForm />} /> */}
              <Route path="register" element={<RegisterForm />} />
            </Route>
            <Route path="store" element={<ShopPage />}>
              <Route index element={<ShopCardsGalery />} />
              <Route path=":categoryName" element={<ShopCardsGalery />} />
            </Route>
            <Route path="products/:itemId" element={<ItemPage />} />
            <Route path="error" element={<ErrorPage />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </React.Suspense>
  );
}
