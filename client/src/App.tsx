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
    <div className="flex flex-col h-screen overflow-auto relative bg-[url('../../public/bg.jpg')] bg-left-bottom pb-10">
      <Header onBagClick={() => setBagVisibility(!isBagVisible)} />
      <div
        id="wrapper"
        className={`${
          isBagVisible ? 'translate-x-full' : 'translate-x-0'
        } fixed h-full w-2/3 top-0 -left-2/3 bg-black/60 ease-out duration-500 z-10`}
      ></div>
      <Bag
        isBagVisible={isBagVisible}
        onCloseClick={() => setBagVisibility(false)}
      />
      <main className="h-full px-16 mt-44 overflow-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        <Outlet />
      </main>
    </div>
  );
}
