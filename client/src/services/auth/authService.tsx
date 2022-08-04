import storage from '../../utils/storage';
import { axios } from '../axios';
import { LoginRequest, RegisterRequest, User } from './types';

const register = async (registerRequest: RegisterRequest) => {
  const response = await axios.post<RegisterRequest, User>(
    'users/register',
    registerRequest
  );
  storage.setToken(response.token);
  return response;
};

const login = async (loginRequest: LoginRequest) => {
  const response = await axios.post<LoginRequest, User>(
    'users/authenticate',
    loginRequest
  );
  storage.setToken(response.token);
  return response;
};

export default { register, login };
