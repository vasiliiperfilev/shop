import { BagItemProps, changeQuantity } from '../redux/bagReducer';
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
      <p>Quantity: {quantity}</p>
      <p>Price: {price * quantity}</p>
      <button onClick={() => dispatch(changeQuantity({ id, delta: 1 }))}>
        +
      </button>
      <button onClick={() => dispatch(changeQuantity({ id, delta: -1 }))}>
        -
      </button>
      {
        // add delete item btn
      }
    </div>
  );
};

export default BagItem;
