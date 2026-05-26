import axios from 'axios';
import { refreshAccessToken } from './authApi';

const TOKEN_KEY = 'spotify_access_token';
const REFRESH_TOKEN_KEY = 'spotify_refresh_token';

const spotifyAxios = axios.create();

spotifyAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!storedRefreshToken) return Promise.reject(error);

    try {
      const data = await refreshAccessToken(storedRefreshToken);
      localStorage.setItem(TOKEN_KEY, data.access_token);
      if (data.refresh_token) {
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
      }
      original.headers.Authorization = `Bearer ${data.access_token}`;
      return spotifyAxios(original);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      window.dispatchEvent(new Event('spotify-auth-cleared'));
      return Promise.reject(error);
    }
  }
);

export default spotifyAxios;
