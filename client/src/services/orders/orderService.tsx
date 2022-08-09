import { axios } from '../axios';
import { Order, PostOrderRequest } from './types';

const getOrders = async () => {
  const response = await axios.get<undefined, Order[]>('users/self/orders');
  return response;
};

const postOrder = async (postOrderRequest: PostOrderRequest) => {
  const response = await axios.post<PostOrderRequest, Order>(
    'users/self/orders',
    postOrderRequest
  );
  return response;
};

export default { getOrders, postOrder };
