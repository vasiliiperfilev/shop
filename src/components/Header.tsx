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
    <header className="fixed top-0 w-full flex p-20">
      <h2 className="font-light tracking-widest">{config.shopName}</h2>
      <div className="ml-auto flex gap-40">
        <h4 className="font-medium">Shop</h4>
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
