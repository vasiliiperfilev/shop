import './styles/tailwind.css';
import './styles/globals.scss';
import { useEffect } from 'react';
import { initializeProducts } from './redux/reducers/shopReducer';
import { useAppDispatch } from './redux/hooks';
import { initilizeCategories } from './redux/reducers/categoriesReduces';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from './utils/history';
import { Spinner } from './components/elements/Spinner';
import React from 'react';
import { AppRoutes } from './routes';

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
        <AppRoutes />
      </HistoryRouter>
    </React.Suspense>
  );
}
