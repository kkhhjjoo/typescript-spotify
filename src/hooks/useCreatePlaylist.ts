import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlaylist } from '../apis/playlistApi';
import useGetCurrentProfile from './useGetCurrentUserProfile';

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  const { data: profile } = useGetCurrentProfile();

  return useMutation({
    mutationFn: (name: string) => {
      if (!profile?.id) throw new Error('사용자 정보를 불러올 수 없습니다.');
      return createPlaylist(profile.id, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user-playlists'] });
    },
  });
};

export default useCreatePlaylist;
