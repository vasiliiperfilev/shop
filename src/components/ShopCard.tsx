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
    <div>
      <img src={image} height="64" width="64" alt={title} />
      <h4>{title}</h4>
      <p>{`$${price.toFixed(2)}`}</p>
    </div>
  );
};

export default ShopCard;
