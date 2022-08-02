import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../config';
import { BiShoppingBag } from 'react-icons/bi';
import { useAppSelector } from '../redux/hooks';

interface HeaderProps {
  onBagClick: () => void;
}

const Header = ({
  onBagClick,
  ...rest
}: HeaderProps & React.HTMLAttributes<HTMLDivElement>) => {
  const numItems = useAppSelector((state) => state.bag.length);
  return (
    <header className="fixed top-0 w-full flex p-16 h-44 items-center ">
      <h2 className="font-light tracking-widest">{config.shopName}</h2>
      <div className="ml-auto flex md:gap-40 gap-10">
        <Link to="store" className="font-medium relative group">
          <span>Shop</span>
          <span className="absolute bottom-0 left-0 h-1 bg-btn-primary/50 w-0 group-hover:w-full ease-out duration-500"></span>
        </Link>
        <button onClick={onBagClick} className="flex items-center relative">
          <BiShoppingBag size={24} />
          {numItems > 0 && (
            <span className="absolute -bottom-2 -right-2 bg-btn-primary text-xs text-primary rounded-full h-4 w-4 flex justify-center items-center">
              {numItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
