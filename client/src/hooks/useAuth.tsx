import { useState, useEffect } from 'react';
import { LoginRequest, RegisterRequest, User } from '../services/auth/types';
import AuthService from '../services/auth/authService';
import { AxiosError } from 'axios';
import { FormErrors } from '../components/form/Form';
import { mapKeys, camelCase } from 'lodash';

const useAuth = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [user, setUser] = useState<User>();
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
      if (registerRequest) {
        user = await AuthService.register(registerRequest);
      } else if (loginRequest) {
        user = await AuthService.login(loginRequest);
      }
      setUser(user);
      //add to redux store
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

  useEffect(() => {
    if (user || errors) {
      setIsRequesting(false);
    }
  }, [user, errors]);

  return { registerUser, loginUser, isRequesting, errors, message };
};

export default useAuth;
