import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../config';

interface HeaderProps {
  onBagClick: () => void;
}

const Header = ({
  onBagClick,
  ...rest
}: HeaderProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header>
      <h2>{config.shopName}</h2>
      <h3>Shop</h3>
      <Link to="/shop">
        <img alt="search" />
      </Link>
      <button onClick={onBagClick}>
        <img alt="shopping bag"></img>
      </button>
    </header>
  );
};

export default Header;
