import { BagItemProps, setQuantity } from '../redux/bagReducer';
import { useAppDispatch } from '../redux/hooks';

const BagItem = ({
  id,
  title,
  quantity,
  price,
  ...rest
}: BagItemProps & React.HTMLAttributes<HTMLDivElement>) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <p>{title}</p>
      <button onClick={() => dispatch(setQuantity({ id, newQuantity: 0 }))}>
        Delete
      </button>
      <p>Quantity: {quantity}</p>
      <p>Price: {price * quantity}</p>
      <button
        onClick={() => dispatch(setQuantity({ id, newQuantity: quantity + 1 }))}
      >
        +
      </button>
      <button
        onClick={() => dispatch(setQuantity({ id, newQuantity: quantity - 1 }))}
      >
        -
      </button>
    </div>
  );
};

export default BagItem;
