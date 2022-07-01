import './styles/tailwind.css';
import './styles/globals.scss';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initializeProducts } from './redux/shopReducer';
import { useAppDispatch } from './redux/hooks';
import Bag from './components/Bag';
import { initilizeCategories } from './redux/categoriesReduces';

export default function App() {
  const dispatch = useAppDispatch();
  const [isBagVisible, setBagVisibility] = useState(false);

  useEffect(() => {
    dispatch(initializeProducts());
  }, []);

  useEffect(() => {
    dispatch(initilizeCategories());
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header onBagClick={() => setBagVisibility(!isBagVisible)} />
      <Bag
        isBagVisible={isBagVisible}
        onCloseClick={() => setBagVisibility(false)}
      />
      <main className="mt-40">
        <Outlet />
      </main>
    </div>
  );
}
