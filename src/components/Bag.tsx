import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import BagItem from './BagItem';

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
      <>
        {itemsList.map((item) => (
          <BagItem {...item} key={item.id} />
        ))}
      </>
    );
  };

  const renderButton = () => {
    if (itemsList.length === 0) {
      return (
        <Link to="/shop">
          <button type="button">BROWSE PRODUCTS</button>
        </Link>
      );
    }
    return (
      <Link to="/">
        <button type="button">CHECKOUT</button>
      </Link>
    );
  };

  return (
    <div className={isBagVisible ? 'flex flex-col' : 'hidden'}>
      <button type="button" onClick={onCloseClick}>
        X
      </button>
      {renderShopList()}
      {renderButton()}
    </div>
  );
};

export default Bag;
