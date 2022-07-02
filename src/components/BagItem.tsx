import { IoMdClose } from 'react-icons/io';
import { BagItemProps, setQuantity } from '../redux/bagReducer';
import { useAppDispatch } from '../redux/hooks';
import { BiPlus, BiMinus } from 'react-icons/bi';

const BagItem = ({
  id,
  title,
  quantity,
  price,
  image,
  ...rest
}: BagItemProps & React.HTMLAttributes<HTMLDivElement>) => {
  const dispatch = useAppDispatch();
  return (
    <div className="relative">
      <div className="grid grid-cols-[48px_1fr_20%] grid-rows-[_repeat(2,_minmax(30px,_auto))] pt-4 items-top justify-center gap-x-4 gap">
        <img
          src={image}
          alt={title}
          width={48}
          height="auto"
          className="col-span-1 row-span-full"
        />
        <h4 className="font-semibold col-span-1">{title}</h4>
        <button
          onClick={() => dispatch(setQuantity({ id, newQuantity: 0 }))}
          className="col-span-1 justify-self-end h-fit"
        >
          <IoMdClose size={16} />
        </button>
        <div className="flex gap-4 col-span-1">
          <button
            onClick={() =>
              dispatch(setQuantity({ id, newQuantity: quantity + 1 }))
            }
            className="h-fit text-btn-secondary"
          >
            <BiPlus size={24} />
          </button>
          <p>{quantity}</p>
          <button
            onClick={() =>
              dispatch(setQuantity({ id, newQuantity: quantity - 1 }))
            }
            className="h-fit text-btn-primary"
          >
            <BiMinus size={24} />
          </button>
        </div>
        <p className="col-span-1 justify-self-end">
          ${(price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default BagItem;
