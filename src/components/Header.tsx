import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h2>YOUR SHOP&apos;S NAME</h2>
      <h3>Shop</h3>
      <img alt="search">
        <Link to="/shop" />
      </img>
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
