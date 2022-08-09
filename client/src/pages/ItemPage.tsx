import { Navigate, useParams } from 'react-router-dom';
import { Button } from '../components/elements/Button';
import { addItem } from '../redux/reducers/bagReducer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const ItemPage = () => {
  const { itemId } = useParams();
  const dispatch = useAppDispatch();
  const items = useAppSelector(({ shop }) => shop);
  const item = items.find((i) => i.id === itemId);

  const onAddClick = () => {
    if (itemId && item) {
      dispatch(addItem(item));
    }
  };

  const renderPage = () => {
    if (item) {
      const { image, title, price, description } = item;
      return (
        <div className="flex flex-col h-full lg:flex-row gap-8 lg:justify-center">
          <div className="lg:w-1/2 h-auto flex justify-center">
            <img src={image} alt={title} className="max-h-full" />
          </div>
          <div className="flex flex-col gap-4 lg:w-1/2">
            <h3 className="text-4xl pb-4 border-b-4 border-btn-secondary">
              {title}
            </h3>
            <h4 className="text-xl">{`$${price}`}</h4>
            <p className="text-lg">{description}</p>
            <Button
              className="mt-auto mx-auto"
              onClick={onAddClick}
              variant="animated"
            >
              Add
            </Button>
          </div>
        </div>
      );
    } else {
      return <Navigate to={'/shop/error'} />;
    }
  };

  return renderPage();
};

export default ItemPage;
