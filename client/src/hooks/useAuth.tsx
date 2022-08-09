import { useState, useEffect } from 'react';
import { LoginRequest, RegisterRequest } from '../services/auth/types';
import AuthService from '../services/auth/authService';
import { AxiosError } from 'axios';
import { FormErrors } from '../components/form/Form';
import { mapKeys, camelCase, reduce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUser } from '../redux/reducers/userReducer';
import storage from '../utils/storage';

const useAuth = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [errors, setErrors] = useState<
    FormErrors<RegisterRequest> | FormErrors<LoginRequest>
  >({});
  const [message, setMessage] = useState<string>();

  const authUser = async (
    registerRequest: RegisterRequest | null,
    loginRequest: LoginRequest | null
  ) => {
    try {
      let user;
      setIsRequesting(true);
      if (registerRequest) {
        user = await AuthService.register(registerRequest);
      } else if (loginRequest) {
        user = await AuthService.login(loginRequest);
      }
      if (user) {
        dispatch(setUser(user));
      }
      return user;
    } catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        setMessage(err.response?.data.title);
        setErrors(
          mapKeys(err.response?.data.errors, (v, k) =>
            camelCase(k)
          ) as FormErrors<RegisterRequest>
        );
      } else {
        console.error(err);
      }
    }
  };

  const registerUser = async (registerRequest: RegisterRequest) =>
    await authUser(registerRequest, null);

  const loginUser = async (loginRequest: LoginRequest) =>
    await authUser(null, loginRequest);

  const logout = () => {
    storage.clearToken();
    dispatch(setUser(null));
  };

  useEffect(() => {
    if (user || errors) {
      setIsRequesting(false);
    }
  }, [user, errors]);

  return { registerUser, loginUser, logout, isRequesting, errors, message };
};

export default useAuth;
