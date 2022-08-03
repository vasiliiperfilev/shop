import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import BagItem from './BagItem';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../../components/elements/Button';
import { setError } from '../../redux/errorReducer';

interface BagProps {
  isBagVisible: boolean;
  onCloseClick: () => void;
}

const Bag = ({
  isBagVisible = false,
  onCloseClick,
}: BagProps & React.HTMLAttributes<HTMLDivElement>) => {
  const itemsList = useAppSelector((state) => state.bag);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const renderShopList = () => {
    if (itemsList.length === 0) {
      return <p>Your bag is empty</p>;
    }
    return (
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {itemsList.map((item) => (
          <BagItem {...item} key={item.id} />
        ))}
      </div>
    );
  };

  const onButtonClick = () => {
    const link = itemsList.length === 0 ? '/shop/store' : '/shop/error';
    const error = itemsList.length === 0 ? undefined : 'Nothing here YET!';
    if (error) dispatch(setError(error));
    navigate(link, { replace: true });
    onCloseClick();
  };

  const renderButton = () => {
    const text = itemsList.length === 0 ? 'BROWSE PRODUCTS' : 'CHECKOUT';
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

  return (
    <div
      className={`${
        isBagVisible ? 'flex flex-col translate-x-0' : 'translate-x-full'
      } fixed top-0 right-0 ease-out duration-500 md:w-1/3 w-full bottom-0 p-16 flex flex-col gap-y-3 bg-[url('../../public/bag.png')] bg-no-repeat bg-center bg-blend-overlay bg-primary text-secondary-dark z-10`}
    >
      <button
        type="button"
        onClick={onCloseClick}
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
      {itemsList.length > 0 && (
        <p>
          Total: $
          {itemsList
            .reduce((sum, { price, quantity }) => sum + price * quantity, 0)
            .toFixed(2)}
        </p>
      )}
      {renderButton()}
    </div>
  );
};

export default Bag;
