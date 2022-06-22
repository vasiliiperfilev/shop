import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShopCategories from '../components/ShopCategories';
import fakestoreService from '../services/fakeStoreService';
import { setError } from '../redux/errorReducer';
import history from '../utils/history';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../redux/hooks';

const ShopPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const initilizeCategories = async () => {
    let fetchedCategories: string[] = [];
    try {
      fetchedCategories = await fakestoreService.getCategories();
    } catch (e) {
      const err = e as AxiosError;
      if (!err?.response) {
        dispatch(setError('No Server Response'));
      } else {
        dispatch(setError(err.message));
      }
      history.push('/error');
    }
    setCategories(fetchedCategories);
  };

  useEffect(() => {
    initilizeCategories();
  }, []);

  return (
    <>
      <ShopCategories categories={categories} />
      <Outlet />
    </>
  );
};

export default ShopPage;
