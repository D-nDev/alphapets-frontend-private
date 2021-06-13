import axios from 'axios';

const api = axios.create({
  // eslint-disable-next-line prettier/prettier
  baseURL: process.env.REACT_APP_API_URL
});

export default api;
