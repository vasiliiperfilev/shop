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
    <div className="grid grid-cols-3 gap-10 mx-auto">
      {products?.map(({ id, image, title, price }) => (
        <Link to={`/products/${id.toString()}`} key={id.toString()}>
          <ShopCard image={image} title={title} price={price} />
        </Link>
      ))}
    </div>
  );
};

export default ShopCardsGalery;
