import { Navigate, useParams } from 'react-router-dom';
import { addItem } from '../redux/bagReducer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import history from '../utils/history';

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
  const dispatch = useAppDispatch();
  const item = useAppSelector(({ shop }) =>
    shop.find((i) => i.id.toString() === itemId)
  );

  const onAddClick = () => {
    if (itemId !== undefined && item !== undefined) {
      const { image, title, price } = item;
      dispatch(
        addItem({
          id: itemId,
          image,
          title,
          price,
        })
      );
    } else {
      history.push('/error');
    }
  };

  const renderPage = () => {
    if (item !== undefined) {
      const { image, title, price, description } = item;
      return (
        <div>
          <img src={image} alt={title} />
          <div>
            <h3>{title}</h3>
            <h4>{`$${price}`}</h4>
            <p>{description}</p>
            <button onClick={onAddClick}>Add</button>
          </div>
        </div>
      );
    } else {
      return <Navigate to={'/error'} />;
    }
  };

  return renderPage();
};

export default ItemPage;
