import axios from 'axios';

const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:3500/api/v1',
});

export default axiosApiInstance;
