import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../../components/elements/Button';
import { ItemRecord } from '../../components/ItemRecord';
import { setError } from '../../redux/reducers/errorReducer';
import orderService from '../../services/orders/orderService';
import { AxiosError } from 'axios';
import { addOrder } from '../../redux/reducers/userReducer';
import { cleanBag } from '../../redux/reducers/bagReducer';

interface BagProps {
  isBagVisible: boolean;
  onClose: () => void;
}

const Bag = ({
  isBagVisible = false,
  onClose,
}: BagProps & React.HTMLAttributes<HTMLDivElement>) => {
  const orderItems = useAppSelector((state) => state.bag);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const renderShopList = () => {
    if (orderItems.length === 0) {
      return <p>Your bag is empty</p>;
    }
    return (
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {orderItems.map((item) => (
          <ItemRecord {...item} editable key={item.id} imageSize="l" />
        ))}
      </div>
    );
  };

  const renderButton = () => {
    const text = orderItems.length === 0 ? 'BROWSE PRODUCTS' : 'CHECKOUT';
    return (
      <Button
        className="text-secondary-dark mt-auto mx-auto border-secondary-dark"
        onClick={() => onButtonClick()}
        variant="animated"
      >
        {text}
      </Button>
    );
  };

  const tryPostOrder = async () => {
    try {
      const order = await orderService.postOrder({
        date: new Date().toISOString(),
        items: orderItems,
      });
      dispatch(addOrder(order));
      dispatch(cleanBag());
      navigate('/shop/user/orders', { replace: true });
    } catch (err: unknown | AxiosError) {
      if (err instanceof AxiosError) {
        dispatch(setError('Processing error'));
        navigate('/shop/error');
      } else {
        console.error(err);
      }
    }
  };

  const onButtonClick = async () => {
    if (orderItems.length === 0) {
      navigate('/shop/store', { replace: true });
      onClose();
      return;
    }

    if (user) {
      await tryPostOrder();
    } else {
      navigate('/shop/auth/login');
    }

    onClose();
  };

  return (
    <div
      className={`${
        isBagVisible ? 'flex flex-col translate-x-0' : 'translate-x-full'
      } fixed top-0 right-0 ease-out duration-500 md:w-1/3 w-full bottom-0 p-16 flex flex-col gap-y-3 bg-[url('../../public/bag.png')] bg-no-repeat bg-center bg-blend-overlay bg-primary text-secondary-dark z-10`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-20 right-20"
      >
        <IoMdClose size={24} />
      </button>
      <div className="text-xl">
        <h3>YOUR</h3>
        <h3>SHOPPING</h3>
        <h3>BAG</h3>
      </div>
      {renderShopList()}
      {orderItems.length > 0 && (
        <p>
          Total: $
          {orderItems
            .reduce((sum, { price, quantity }) => sum + price * quantity, 0)
            .toFixed(2)}
        </p>
      )}
      {renderButton()}
    </div>
  );
};

export default Bag;
