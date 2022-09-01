import axios from 'axios';
import { ItemResponse } from './types/item.response';
import { API_URL } from '../../config';

const getProducts = async (category: string | undefined) => {
  const url = category
    ? `${API_URL}/items/categories/${category}`
    : `${API_URL}/items/`;
  const response = await axios.get<ItemResponse[]>(url);
  return response.data.map((item) => ({
    ...item,
    link: '/shop/products/' + item.id,
  }));
};

const getCategories = async () => {
  const url = `${API_URL}/items/categories`;
  const response = await axios.get<string[]>(url);
  return response.data;
};

export default { getProducts, getCategories };
