import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import BagItem from './BagItem';

interface BagProps {
  isBagVisible: boolean;
}

const Bag = ({
  isBagVisible = false,
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
      <button type="button">X</button>
      {
        // Add close btn function
      }
      {renderShopList()}
      {renderButton()}
    </div>
  );
};

export default Bag;
