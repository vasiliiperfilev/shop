import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import ShopCard from './ShopCard';

const ShopCardsGalery = () => {
  const { categoryName } = useParams();

  const products = useAppSelector(({ shop }) =>
    categoryName
      ? shop.filter((product) => product.category === categoryName)
      : shop
  );

  return (
    <>
      {products?.map((product) => (
        <Link to={product.id} key={product.id}>
          <ShopCard {...product} />
        </Link>
      ))}
    </>
  );
};

export default ShopCardsGalery;
