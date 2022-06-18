import { Link } from 'react-router-dom';
import ShopCard from './ShopCard';

const ShopCardsGalery = () => {
  return (
    <>
      <div>Galery</div>
      <Link to="item1">
        <ShopCard />
      </Link>
    </>
  );
};

export default ShopCardsGalery;
