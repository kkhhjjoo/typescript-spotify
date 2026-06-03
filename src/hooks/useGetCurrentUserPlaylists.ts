import { useQuery } from '@tanstack/react-query'
import { getCurrentUserPlaylists } from '../apis/playlistApi';
import type { GetCurrentUserPlaylistRequest } from '../models/playlist';
import { useAuth } from '../contexts/AuthContext';

const useGetCurrentUserPlaylists = ({limit, offset }: GetCurrentUserPlaylistRequest) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['current-user-playlists'],
    queryFn: () => getCurrentUserPlaylists({limit, offset}),
    enabled: !!token,
  })
}

export default useGetCurrentUserPlaylists;