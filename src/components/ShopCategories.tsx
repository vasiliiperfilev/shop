import { Link } from 'react-router-dom';

const ShopCategories = () => {
  return (
    <div className="categories">
      <h4>Shop/</h4>
      <h2>
        All products
        {
          // TODO: change when user clicks on category to category name
        }
      </h2>
      <ul>
        <li>
          <Link to="category1">Category1</Link>
        </li>
        <li>
          <Link to="category2">Category2</Link>
        </li>
        <li>
          <Link to="category3">Category3</Link>
        </li>
        {
          // TODO: fetch categories from API, make them as React Link components
          // TODO: load clicked category items from API on click, display load screen
        }
      </ul>
    </div>
  );
};

export default ShopCategories;
