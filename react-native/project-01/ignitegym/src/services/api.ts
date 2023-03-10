import { AppError } from '@utils/AppError';
import axios, { AxiosInstance } from 'axios';

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
  baseURL: 'http://10.0.0.149:3333'
}) as APIInstanceProps;

/*
api.interceptors.request.use((config) => {
  console.log(config.data);
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});
*/

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(
    response => response, error => {
      if (error.response && error.response.data) {
        
        return Promise.reject(new AppError(error.response.data.message));
      } else {
        return Promise.reject(error);
      }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}

export { api };