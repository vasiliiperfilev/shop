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
      {products?.map(({ id, image, title, price }) => (
        <Link to={id.toString()} key={id.toString()}>
          <ShopCard image={image} title={title} price={price} />
        </Link>
      ))}
    </>
  );
};

export default ShopCardsGalery;
