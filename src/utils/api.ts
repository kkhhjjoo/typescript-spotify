import axios from 'axios';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';

const api = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem('spotify_access_token');
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
})

export default api;