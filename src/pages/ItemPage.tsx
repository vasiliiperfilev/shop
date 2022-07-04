import { Navigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
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
        <div className="flex flex-col h-full md:flex-row gap-8 md:justify-center">
          <div className="md:w-1/2 h-full flex justify-center">
            <img src={image} alt={title} className="max-h-full" />
          </div>
          <div className="flex flex-col gap-4 md:w-1/2">
            <h3 className="text-4xl pb-4 border-b-4 border-btn-secondary">
              {title}
            </h3>
            <h4 className="text-xl">{`$${price}`}</h4>
            <p className="text-lg">{description}</p>
            <Button
              text="Add"
              className="mt-auto mx-auto"
              onClick={onAddClick}
            />
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
