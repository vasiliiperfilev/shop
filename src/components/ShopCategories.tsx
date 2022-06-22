import { Link } from 'react-router-dom';

interface ShopCategoriesProps {
  categories: string[];
}

const ShopCategories = ({
  categories,
}: ShopCategoriesProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="categories">
      <h4>Shop/</h4>
      <h2>All products</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={category}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopCategories;
