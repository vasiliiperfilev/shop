import './styles/tailwind.css';
import './styles/globals.scss';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeProducts } from './redux/shopReducer';
import { useAppDispatch } from './redux/hooks';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
