import { InputAdornment, styled, TextField } from '@mui/material';
import { useState } from 'react';
import { useSearchItemsByKeyword } from '../../../hooks/useSearchItemsByKeyword';
import SearchIcon from '@mui/icons-material/Search';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from '../../SearchPage/components/SearchResultList';
import useAddTrackToPlaylist from '../../../hooks/useAddTrackToPlaylist';
import { addTrackToLocalPlaylist } from '../../../utils/localPlaylistManager';
import type { Track } from '../../../models/track';

const Wrapper = styled('div')({
  width: '100%',
});

const StyledTextField = styled(TextField)({
  width: '100%',
  '& .MuiInputBase-root': {
    borderRadius: '4px',
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'gray' },
    '&.Mui-focused fieldset': { borderColor: 'gray' },
  },
});

interface EmptyPlaylistWithSearchProps {
  playlistId: string;
  onAdded?: () => void;
}

const EmptyPlaylistWithSearch = ({ playlistId, onAdded }: EmptyPlaylistWithSearchProps) => {
  const [keyword, setKeyword] = useState<string>('');

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const { mutate: addTrack } = useAddTrackToPlaylist();

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];

  const handleAdd = (track: Track) => {
    if (playlistId.startsWith('local-')) {
      addTrackToLocalPlaylist(playlistId, track);
      onAdded?.();
    } else if (track.uri) {
      addTrack({ playlistId, trackUri: track.uri }, { onSuccess: () => onAdded?.() });
    }
  };

  return (
    <Wrapper>
      <StyledTextField
        value={keyword}
        autoComplete="off"
        variant="outlined"
        placeholder="노래를 검색하세요"
        fullWidth
        onChange={(e) => setKeyword(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: 'white' }} />
              </InputAdornment>
            ),
          },
        }}
      />
      {keyword && (
        <SearchResultList
          list={tracks}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          onAdd={handleAdd}
        />
      )}
    </Wrapper>
  );
};

export default EmptyPlaylistWithSearch;
