import { styled, } from '@mui/material';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import Playlist from './Playlist';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';

import EmptyPlaylist from "./EmptyPlaylist";
import { ClipLoader } from 'react-spinners';

const PlayListContainer = styled('div')(({ theme }) => ({
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 240px)',
  height: '100%',
  '&::-webkit-scollbar': {
    display: 'none',
    msOverflowStyle: 'none', //IE and Edge
    scrollbarWidth: 'none', //Firefox
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: 'calc(100vh = 65px - 119px)'
  }
}));

const Library = () => {
  
  const { data, isLoading, isError, error } = useGetCurrentUserPlaylists({limit: 10, offset: 0})
  console.log('data', data, '| isLoading', isLoading, '| isError', isError, '| error', error);

  if (isLoading) { 
    return (
      <ClipLoader
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
  if (error) { 
    return <ErrorMessage errorMessage={error.message} />
  }

  return (
    <div>
      {!data || data?.total === 0 ? (
      <EmptyPlaylist />
      ) : (
          <PlayListContainer>
            <Playlist playlists={data.items} />
          </PlayListContainer>
      ) }
      
    </div>
  );
};

export default Library;