import { useState, useEffect } from 'react';
import { LoginRequest, RegisterRequest } from '../services/auth/types';
import AuthService from '../services/auth/authService';
import { AxiosError } from 'axios';
import { FormErrors } from '../components/form/Form';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUser } from '../redux/reducers/userReducer';
import storage from '../utils/storage';

export interface ServerError {
  value: string;
  param: keyof RegisterRequest;
  msg: string;
}

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
      let authResponse;
      setIsRequesting(true);
      if (registerRequest) {
        authResponse = await AuthService.register(registerRequest);
      } else if (loginRequest) {
        authResponse = await AuthService.login(loginRequest);
      }
      if (authResponse) {
        dispatch(setUser(authResponse.user));
        return authResponse.user;
      }
    } catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        setMessage(err.response?.data.message);
        setErrors(
          err.response?.data.errors?.reduce(
            (
              errs: FormErrors<RegisterRequest>,
              { param, msg }: ServerError
            ) => {
              errs[param] = msg;
              return errs;
            },
            {}
          )
        );
      } else {
        console.error(err);
      }
      setIsRequesting(false);
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
    if (user) {
      setIsRequesting(false);
    }
  }, [user]);

  return { registerUser, loginUser, logout, isRequesting, errors, message };
};

export default useAuth;
