import { AppError } from '@utils/AppError';
import axios, { AxiosError, AxiosInstance } from 'axios';

import { storageAuthTokenGet } from '@storage/storageAuthToken';

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onError: (error: AxiosError) => void;
}

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

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false; 

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(
    response => response, async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
          const { refresh_token } = await storageAuthTokenGet();

          if(!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {

            });
          };

          isRefreshing = true;
        }

        signOut(); 
      }
      
      
      
      
      
      
      
      if (requestError.response && requestError.response.data) {
        
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}

export { api };