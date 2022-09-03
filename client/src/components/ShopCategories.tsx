import { useParams } from 'react-router-dom';
import { Link } from './elements/Link';

interface ShopCategoriesProps {
  categories: string[];
}

// TODO: create hook to fetch categories instead of reducer
const ShopCategories = ({
  categories,
}: ShopCategoriesProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { categoryName } = useParams();
  return (
    <div className="md:fixed h-fit">
      <h4>Shop /</h4>
      <h2 className="mb-10 text-3xl">
        {categoryName ? categoryName : 'All products'}
      </h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={category} variant="side" size="lg" className="w-full">
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopCategories;
