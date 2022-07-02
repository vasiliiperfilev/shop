import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import BagItem from './BagItem';
import { IoMdClose } from 'react-icons/io';

interface BagProps {
  isBagVisible: boolean;
  onCloseClick: () => void;
}

const Bag = ({
  isBagVisible = false,
  onCloseClick,
}: BagProps & React.HTMLAttributes<HTMLDivElement>) => {
  const itemsList = useAppSelector((state) => state.bag);
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

  const renderButton = () => {
    const classes =
      'mt-auto flex justify-center border border-secondary py-4 relative group text-secondary-dark';
    let link;
    let text;
    if (itemsList.length === 0) {
      link = '/shop';
      text = 'BROWSE PRODUCTS';
    } else {
      link = '/';
      text = 'CHECKOUT';
    }
    return (
      <Link to={link} className={classes}>
        <span className="absolute w-full h-0 group-hover:h-full transition-all ease-out duration-500 bg-btn-primary bottom-0 left-0"></span>
        <button type="button" className="group-hover:text-primary relative">
          {text}
        </button>
      </Link>
    );
  };

  return (
    <div
      className={`${
        isBagVisible ? 'flex flex-col translate-x-0' : 'translate-x-full'
      } fixed top-0 right-0 ease-out duration-500 w-1/3 bottom-0 p-16 flex flex-col gap-y-3 bg-[url('../../public/bag.png')] bg-no-repeat bg-center bg-blend-overlay bg-primary text-secondary-dark z-10`}
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
