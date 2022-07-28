export interface ShopCardProps {
  title: string;
  price: number;
  image: string;
}

const ShopCard = ({
  image,
  title,
  price,
}: ShopCardProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex flex-col gap-2 w-60">
      <span className="overflow-hidden h-60 p-10 flex justify-center items-center bg-white">
        <img src={image} alt={title} />
      </span>
      <h4>{title}</h4>
      <p>{`$${price.toFixed(2)}`}</p>
    </div>
  );
};

export default ShopCard;
