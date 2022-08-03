import storage from '../../utils/storage';
import { axios } from '../axios';
import { RegisterRequest, User } from './types';

const register = async (registerRequest: RegisterRequest) => {
  const response = await axios.post<RegisterRequest, User>(
    'user/register',
    registerRequest
  );
  storage.setToken(response.token);
  return response;
};

export default { register };
