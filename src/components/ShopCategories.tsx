import { Link, useParams } from 'react-router-dom';

interface ShopCategoriesProps {
  categories: string[];
}

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
          <li key={category} className="relative group text-lg">
            <Link to={category}>{category}</Link>
            <span className="absolute bottom-1 left-0 h-2 bg-btn-primary/30 w-0 group-hover:w-full ease-out duration-500"></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopCategories;
