import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { setQuantity } from '../redux/reducers/bagReducer';
import { useAppDispatch } from '../redux/hooks';
import { OrderItem } from '../services/orders/types';

const ImageSizes = {
  m: 48,
  l: 128,
};

type ItemRecordProps = OrderItem & {
  editable?: boolean;
  imageSize?: keyof typeof ImageSizes;
};

export const ItemRecord = ({
  item,
  quantity,
  editable = false,
  imageSize = 'm',
  className = '',
}: ItemRecordProps & React.HTMLAttributes<HTMLDivElement>) => {
  const dispatch = useAppDispatch();
  const { id, link, image, title, price } = item;
  return (
    <div className={'relative ' + className}>
      <div className="flex justify-between pt-4 gap-x-4 w-full">
        <a href={link}>
          <img
            src={image}
            alt={title}
            width={ImageSizes[imageSize]}
            height="auto"
          />
        </a>
        <div className="flex flex-col justify-center items-center">
          <h4 className="font-semibold">{title}</h4>
          {editable && (
            <div className="flex gap-4 mr-auto">
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
          )}
        </div>
        <div className="flex flex-col justify-center">
          {editable && (
            <button
              onClick={() => dispatch(setQuantity({ id, newQuantity: 0 }))}
              className="mt-auto ml-auto"
            >
              <IoMdClose size={16} />
            </button>
          )}
          <p className="mt-auto">${(price * quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
