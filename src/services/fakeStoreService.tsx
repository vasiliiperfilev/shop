import axios from 'axios';
import { ShopCardProps } from '../components/ShopCard';

const baseUrl = 'https://fakestoreapi.com/products';

const getProducts = async (category: string | undefined) => {
  const url = category ? `${baseUrl}/${category}` : baseUrl;
  const response = await axios.get<ShopCardProps[]>(url);
  return response.data;
};

const getCategories = async () => {
  const url = `${baseUrl}/categories`;
  const response = await axios.get<string[]>(url);
  return response.data;
};

export default { getProducts, getCategories };
