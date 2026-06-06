import { useMutation } from '@tanstack/react-query';
import { addTrackToPlaylist } from '../apis/playlistApi';

const useAddTrackToPlaylist = () => {
  return useMutation({
    mutationFn: ({ playlistId, trackUri }: { playlistId: string; trackUri: string }) =>
      addTrackToPlaylist(playlistId, trackUri),
  });
};

export default useAddTrackToPlaylist;
