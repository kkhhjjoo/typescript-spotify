import axios from 'axios';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';

const TOKEN_KEY = 'spotify_access_token';
const REFRESH_TOKEN_KEY = 'spotify_refresh_token';

const api = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      window.dispatchEvent(new Event('spotify-auth-cleared'));
    }
    return Promise.reject(error);
  }
);

export default api;
