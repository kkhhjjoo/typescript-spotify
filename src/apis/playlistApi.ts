import type { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse, GetPlaylistRequest, Playlist, SimplifiedPlaylist } from '../models/playlist';
import api from '../utils/api';

export const getCurrentUserPlaylists = async ({limit, offset}: GetCurrentUserPlaylistRequest):Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    throw new Error('현재 사용자 플레이리스트 페치를 실패했습니다.', { cause: error });
  }
}

export const createPlaylist = async (userId: string, name: string): Promise<SimplifiedPlaylist> => {
  const response = await api.post(`/users/${userId}/playlists`, { name, public: false });
  return response.data;
}

export const getPlaylist = async (params: GetPlaylistRequest):Promise<Playlist> => { 
  try {
    const response = await api.get(`/playlists/${params.playlistId}`, {
      params: params
    });
    return response.data;
  } catch (error) { 
    throw new Error('Fail to fetch playlist detail', { cause: error });
  }
}