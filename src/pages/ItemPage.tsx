import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export interface ItemProps {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const ItemPage = () => {
  const { itemId } = useParams();
  const { image, title, price, description } = useAppSelector(({ shop }) =>
    shop.find((item) => item.id.toString() === itemId)
  ) as ItemProps;
  return (
    <div>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <h4>{`$${price}`}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ItemPage;
