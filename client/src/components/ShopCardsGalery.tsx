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
    <div className="grid grid-cols-fluid gap-10 md:mx-auto w-2/3">
      {products?.map(({ id, image, title, price }) => (
        <Link
          to={`/shop/products/${id.toString()}`}
          key={id.toString()}
          className="flex justify-center"
        >
          <ShopCard image={image} title={title} price={price} />
        </Link>
      ))}
    </div>
  );
};

export default ShopCardsGalery;
