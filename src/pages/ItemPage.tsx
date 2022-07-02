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
        <div className="flex gap-8 h-full pb-10 justify-center">
          <div className="w-1/2 h-full overflow-hidden flex justify-center">
            <img src={image} alt={title} className="max-h-full" />
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <h3 className="text-4xl pb-4 border-b-4 border-btn-secondary">
              {title}
            </h3>
            <h4 className="text-xl">{`$${price}`}</h4>
            <p className="text-lg">{description}</p>
            <button
              onClick={onAddClick}
              className="mt-auto border border-btn-primary w-fit px-8 py-2 relative group mx-auto"
            >
              <span className="absolute w-full h-0 group-hover:h-full transition-all ease-out duration-500 bg-btn-primary bottom-0 left-0"></span>
              <span className="group-hover:text-primary relative">Add</span>
            </button>
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
