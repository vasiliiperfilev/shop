import axios from 'axios';
import { ItemResponse } from './types/item.response';

const baseUrl = 'https://fakestoreapi.com/products';

const getProducts = async (category: string | undefined) => {
  const url = category ? `${baseUrl}/${category}` : baseUrl;
  const response = await axios.get<ItemResponse[]>(url);
  return response.data.map((item) => ({
    ...item,
    link: '/shop/products/' + item.id,
    id: item.id.toString(),
  }));
};

const getCategories = async () => {
  const url = `${baseUrl}/categories`;
  const response = await axios.get<string[]>(url);
  return response.data;
};

export default { getProducts, getCategories };
