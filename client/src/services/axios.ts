import Axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../config';
import storage from '../utils/storage';

// export class APIError<TError> extends Error {
//   name: string;
//   message: string;
//   errors?: TError;

//   constructor(name: string, message: string, errors?: TError) {
//     super(message);

//     this.name = name;
//     this.message = message;

//     if (errors) {
//       this.errors = errors;
//     }
//   }
// }

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token && config.headers) {
    config.headers.authorization = `${token}`;
    config.headers.Accept = 'application/json';
  }
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
