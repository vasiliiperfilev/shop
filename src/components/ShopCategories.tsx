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
        <li>Category1</li>
        <li>Category2</li>
        <li>Category3</li>
        <li>Category4</li>
        {
          // TODO: fetch categories from API, make them as React Link components
          // TODO: load clicked category items from API on click, display load screen
        }
      </ul>
    </div>
  );
};

export default ShopCategories;
