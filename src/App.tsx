import './styles/tailwind.css';
import './styles/globals.scss';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initializeProducts } from './redux/shopReducer';
import { useAppDispatch } from './redux/hooks';
import Bag from './components/Bag';

export default function App() {
  const dispatch = useAppDispatch();
  const [isBagVisible, setBagVisibility] = useState(false);

  useEffect(() => {
    dispatch(initializeProducts());
  });

  const toggleBag = () => setBagVisibility(!isBagVisible);

  return (
    <>
      <Header onBagClick={toggleBag} />
      <Bag isBagVisible={isBagVisible} />
      <Outlet />
    </>
  );
}
