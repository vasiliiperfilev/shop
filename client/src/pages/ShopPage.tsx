import { Outlet } from 'react-router-dom';
import ShopCategories from '../components/ShopCategories';
import { useAppSelector } from '../redux/hooks';

const ShopPage = () => {
  const categories = useAppSelector((state) => state.categories);

  return (
    <div className="flex relative flex-col gap-8">
      <ShopCategories categories={categories} />
      <Outlet />
    </div>
  );
};

export default ShopPage;
