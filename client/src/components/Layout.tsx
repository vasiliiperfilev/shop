import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Bag from '../features/bag/Bag';
import Header from './Header';

export const Layout = () => {
  const [isBagVisible, setBagVisibility] = useState(false);

  const toggleBagVisibility = () => setBagVisibility(!isBagVisible);

  return (
    <div className="flex flex-col h-screen overflow-auto relative bg-[url('../../public/bg.jpg')] bg-left-bottom pb-10">
      <Header onBagClick={toggleBagVisibility} />
      <div
        id="wrapper"
        className={`${
          isBagVisible ? 'translate-x-full' : 'translate-x-0'
        } fixed h-full w-2/3 top-0 -left-2/3 bg-black/60 ease-out duration-500 z-10`}
      ></div>
      <Bag isBagVisible={isBagVisible} onClose={toggleBagVisibility} />
      <main className="h-full px-16 mt-44 overflow-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
