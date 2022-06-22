import { Link } from 'react-router-dom';
import { config } from '../config';

const Header = () => {
  return (
    <header>
      <h2>{config.shopName}</h2>
      <h3>Shop</h3>
      <Link to="/shop">
        <img alt="search" />
      </Link>
      <button>
        <img alt="shopping bag">
          {
            // TODO: add function to change Bag visibility state
          }
        </img>
      </button>
    </header>
  );
};

export default Header;
