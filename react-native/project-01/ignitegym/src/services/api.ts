import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.149:3333'
});

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

export { api };