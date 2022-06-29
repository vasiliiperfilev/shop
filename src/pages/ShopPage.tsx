import { Outlet } from 'react-router-dom';
import ShopCategories from '../components/ShopCategories';
import { useAppSelector } from '../redux/hooks';

const ShopPage = () => {
  const categories = useAppSelector((state) => state.categories);

  return (
    <>
      <ShopCategories categories={categories} />
      <Outlet />
    </>
  );
};

export default ShopPage;
