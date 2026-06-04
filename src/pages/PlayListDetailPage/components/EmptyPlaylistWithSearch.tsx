import { InputAdornment, styled, TextField } from '@mui/material';
import { useState } from 'react';
import { useSearchItemsByKeyword } from '../../../hooks/useSearchItemsByKeyword';
import SearchIcon from '@mui/icons-material/Search';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from '../../SearchPage/components/SearchResultList';

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
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'gray',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'gray',
    },
  },
});

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>('');

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Wrapper>
      <p style={{ margin: '10px 0', fontSize: '1.25rem', fontWeight: 600 }}>
        Let's find something for your playlist
      </p>
      <StyledTextField
        value={keyword}
        autoComplete="off"
        variant="outlined"
        placeholder="Search for songs or episodes"
        fullWidth
        onChange={handleSearchKeyword}
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
        />
      )}
    </Wrapper>
  );
};

export default EmptyPlaylistWithSearch;
