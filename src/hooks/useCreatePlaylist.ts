import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlaylist } from '../apis/playlistApi';
import useGetCurrentProfile from './useGetCurrentUserProfile';
import type { CreatePlaylistRequest } from '../models/playlist';
import { addLocalPlaylist } from '../utils/localPlaylistManager';
import axios from 'axios';

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentProfile();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['current-user-playlists'] });
    queryClient.invalidateQueries({ queryKey: ['local-playlists'] });
  };

  return useMutation({
    mutationFn: async (params: CreatePlaylistRequest) => {
      if (!user) return Promise.reject(new Error('user is not defined'));
      try {
        return await createPlaylist(user.id, params);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          return addLocalPlaylist(params.name);
        }
        throw error;
      }
    },
    onSuccess: invalidate,
  });
};

export default useCreatePlaylist;
