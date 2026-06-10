import { useQuery } from '@tanstack/react-query'
import { getCurrentUserPlaylists } from '../apis/playlistApi';
import type { GetCurrentUserPlaylistRequest } from '../models/playlist';
import { useAuth } from '../contexts/AuthContext';
import { getLocalPlaylists, getLocalPlaylistTracks } from '../utils/localPlaylistManager';

const useGetCurrentUserPlaylists = ({limit, offset }: GetCurrentUserPlaylistRequest) => {
  const { token } = useAuth();

  const localQuery = useQuery({
    queryKey: ['local-playlists'],
    queryFn: () => {
      const playlists = getLocalPlaylists();
      return playlists.map((p) => {
        const firstTrackImage = p.id ? getLocalPlaylistTracks(p.id)[0]?.track?.album?.images?.[0]?.url : undefined;
        return firstTrackImage
          ? { ...p, images: [{ url: firstTrackImage, width: 64, height: 64 }] }
          : p;
      });
    },
    staleTime: 0,
  });

  const spotifyQuery = useQuery({
    queryKey: ['current-user-playlists', limit, offset],
    queryFn: () => getCurrentUserPlaylists({limit, offset}),
    enabled: !!token,
  });

  const localItems = localQuery.data ?? [];
  const spotifyItems = spotifyQuery.data?.items ?? [];
  const merged = [...spotifyItems, ...localItems];

  return {
    ...spotifyQuery,
    data: spotifyQuery.data
      ? { ...spotifyQuery.data, items: merged, total: merged.length }
      : localItems.length > 0
        ? { items: localItems, total: localItems.length, href: '', limit, offset, next: null, previous: null }
        : undefined,
    isLoading: spotifyQuery.isLoading,
    error: spotifyQuery.error,
  };
}

export default useGetCurrentUserPlaylists;