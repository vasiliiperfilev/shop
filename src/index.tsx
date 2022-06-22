/* eslint-disable prettier/prettier */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LandingBanner from './components/LandingBanner';
import ShopCardsGalery from './components/ShopCardsGalery';
import ItemPage from './pages/ItemPage';
import ShopPage from './pages/ShopPage';
import { store } from './redux/store';
import { Provider } from 'react-redux'
import ErrorPage from './pages/ErrorPage';
import history from './utils/history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingBanner />} />
          <Route path="shop" element={<ShopPage />}>
            <Route index element={<ShopCardsGalery />} />
            <Route path=":categoryName" element={<ShopCardsGalery />} />
            <Route path=":categoryName/:itemId" element={<ItemPage />} />
          </Route>
          <Route
            path="/error"
            element={<ErrorPage />}
          />
        </Route>
      </Routes>
    </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
