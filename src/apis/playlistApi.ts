import type { CreatePlaylistRequest, GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, GetPlaylistRequest, Playlist, SimplifiedPlaylist } from '../models/playlist';
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

export const createPlaylist = async (userId: string, params: CreatePlaylistRequest): Promise<SimplifiedPlaylist> => {
  const { name, playlistPublic, collaborative, description } = params;
  const response = await api.post(`/users/${userId}/playlists`, {
    name,
    public: playlistPublic,
    collaborative,
    description
  });
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

export const getPlaylistItems = async (params: GetPlaylistItemsRequest):Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlistId}/tracks`, {
      params
    });
    return response.data;
  } catch (error) {
    throw new Error('Fail to fetch playlist items',  { cause: error })
  }
}

export const addTrackToPlaylist = async (playlistId: string, trackUri: string): Promise<void> => {
  try {
    await api.post(`/playlists/${playlistId}/tracks`, { uris: [trackUri] });
  } catch (error) {
    throw new Error('Fail to add track to playlist', { cause: error });
  }
}