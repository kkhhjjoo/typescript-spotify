import { useQuery } from '@tanstack/react-query'
import type { GetPlaylistRequest } from '../models/playlist'
import { getPlaylist } from '../apis/playlistApi';

const useGetPlaylist = (params: GetPlaylistRequest) => { 
  return useQuery({
    queryKey: ['playlist-detail', params.playlistId],
    queryFn: () => { 
      return getPlaylist(params);
    },
    enabled: !!params.playlistId
  })
}

export default useGetPlaylist;