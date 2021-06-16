import axios from 'axios';

const uploadbackend = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_UPLOAD1,
});

export default uploadbackend;
