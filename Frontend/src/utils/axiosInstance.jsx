import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: `Token ${token}`
  }
});

export default axiosInstance;
