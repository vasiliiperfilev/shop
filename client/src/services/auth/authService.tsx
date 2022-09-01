import storage from '../../utils/storage';
import { axios } from '../axios';
import { AuthResponse, LoginRequest, RegisterRequest, User } from './types';

const register = async (registerRequest: RegisterRequest) => {
  const response = await axios.post<RegisterRequest, AuthResponse>(
    'users/register',
    registerRequest
  );
  storage.setToken(response.token);
  return response;
};

const login = async (loginRequest: LoginRequest) => {
  const response = await axios.post<LoginRequest, AuthResponse>(
    'users/authenticate',
    loginRequest
  );
  storage.setToken(response.token);
  return response;
};

export default { register, login };
