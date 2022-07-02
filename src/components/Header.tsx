import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../config';
import { BiSearchAlt, BiShoppingBag } from 'react-icons/bi';

interface HeaderProps {
  onBagClick: () => void;
}

const Header = ({
  onBagClick,
  ...rest
}: HeaderProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header className="fixed top-0 w-full flex p-16 h-44 items-center ">
      <h2 className="font-light tracking-widest">{config.shopName}</h2>
      <div className="ml-auto flex gap-40">
        <Link to="/shop" className="font-medium relative group">
          <span>Shop</span>
          <span className="absolute bottom-0 left-0 h-1 bg-btn-primary/50 w-0 group-hover:w-full ease-out duration-500"></span>
        </Link>
        <Link to="/shop" className="text-primary-dark flex items-center">
          <BiSearchAlt size={24} />
        </Link>
        <button onClick={onBagClick} className="flex items-center">
          <BiShoppingBag size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
