import axios from 'axios';
import { baseURL } from './api/Api';

const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Axios;
