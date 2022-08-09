import React from 'react';
import { Link } from './elements/Link';
import { config } from '../config';
import { BiShoppingBag } from 'react-icons/bi';
import { useAppSelector } from '../redux/hooks';
import useAuth from '../hooks/useAuth';

interface HeaderProps {
  onBagClick: () => void;
}

const Header = ({
  onBagClick,
  ...rest
}: HeaderProps & React.HTMLAttributes<HTMLDivElement>) => {
  const numItems = useAppSelector((state) => state.bag.length);
  const user = useAppSelector((state) => state.user);
  const { logout } = useAuth();

  return (
    <header
      className="fixed top-0 w-full flex p-16 h-44 items-center"
      {...rest}
    >
      <h2 className="font-light tracking-widest">{config.shopName}</h2>
      <div className="ml-auto flex md:gap-40 gap-10">
        <Link to="store" className="font-medium relative group">
          Shop
        </Link>
        {user && (
          <>
            <Link to="user/orders" className="font-medium relative group">
              My orders
            </Link>
            <Link
              to="/shop"
              className="font-medium relative group"
              onClick={logout}
            >
              Logout
            </Link>
          </>
        )}
        {!user && (
          <Link to="auth/login" className="font-medium relative group">
            Log in
          </Link>
        )}
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
