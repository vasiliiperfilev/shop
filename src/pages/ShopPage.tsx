import { Outlet } from 'react-router-dom';
import ShopCategories from '../components/ShopCategories';

const ShopPage = () => {
  return (
    <>
      <ShopCategories />
      <Outlet />
    </>
  );
};

export default ShopPage;
