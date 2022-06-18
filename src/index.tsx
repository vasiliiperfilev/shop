import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LandingBanner from './components/LandingBanner';
import ShopCardsGalery from './components/ShopCardsGalery';
import ItemPage from './pages/ItemPage';
import ShopPage from './pages/ShopPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingBanner />} />
          <Route path="shop" element={<ShopPage />}>
            <Route path=":categoryName" element={<ShopCardsGalery />} />
            <Route path=":categoryName/:itemId" element={<ItemPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
