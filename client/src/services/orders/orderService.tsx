import { axios } from '../axios';
import { Order, PostOrderRequest } from './types';

const getOrders = async (userId: string) => {
  const response = await axios.get<undefined, Order[]>(
    `users/${userId}/orders`
  );
  return response;
};

const postOrder = async (postOrderRequest: PostOrderRequest) => {
  const response = await axios.post<PostOrderRequest, Order>(
    `users/${postOrderRequest.userId}/orders`,
    postOrderRequest
  );
  return response;
};

export default { getOrders, postOrder };
