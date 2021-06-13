import axios from 'axios';

const backendapi = axios.create({
  baseURL: process.env.REACT_APP_LOGIN_API_URL,
});

export default backendapi;
