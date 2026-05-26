import axios from 'axios';
import spotifyAxios from './axiosInstance';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';
import type { GetNewReleasesResponse } from '../models/album';

export const getNewReleases = async (token: string): Promise<GetNewReleasesResponse> => {
  try {
    const response = await spotifyAxios.get(`${SPOTIFY_BASE_URL}/search?q=tag:new&type=album&limit=6`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('[albumApi] status:', error.response?.status, error.response?.data);
    }
    throw new Error('Fail to fetch new release', { cause: error });
  }
}
