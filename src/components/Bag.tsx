import { Link } from 'react-router-dom';

const Bag = () => {
  return (
    <div>
      <button type="button">X</button>
      <h2>YOUR</h2>
      <h2>SHOPPING</h2>
      <h2>BAG</h2>
      <p>Your bag is empty</p>
      <Link to="/shop">
        <button type="button">BROWSE PRODUCTS</button>
      </Link>
    </div>
  );
};

export default Bag;
