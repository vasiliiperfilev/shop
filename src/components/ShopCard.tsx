export interface ShopCardProps {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
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
