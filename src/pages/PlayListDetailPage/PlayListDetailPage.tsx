import { Navigate, useParams } from 'react-router'
import useGetPlaylist from '../../hooks/useGetPlaylist';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Box, styled, Typography } from '@mui/material';

import { Grid } from '@mui/system';
import DefaultImage from '../../common/components/DefaultImage';


const PlaylistHeader = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)',
  padding: '16px'
});
const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'

  }
}));

const AlbumImage = styled('img')(({ theme }) => ({
  borderRadius: '8px',
  height: 'auto',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '200px'
  }
}));

const PlayListDetailPage = () => {
  const { id } = useParams<{id: string}>();
  const { data:playlist } = useGetPlaylist({playlistId: id ?? ''})
  if (id === undefined) return <Navigate to="/" />
  return (
    <PlaylistHeader container spacing={7}>
      <ImageGrid size={{ sm: 12, md: 2 }}>
        {playlist?.images ? (
          <AlbumImage src={playlist?.images[0].url} alt="playlist_cover" />
        ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize='large' />
            </DefaultImage>
        )}
      </ImageGrid>
      <Grid size={{ sm: 12, md: 10 }}>
        <Box display="flex" alignItems="center">
          <img src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5" width="20" alt="" />
          <Typography variant="subtitle1" sx={{ color: 'white', ml: 1, fontWeight: 700 }}>
            {playlist?.owner?.display_name? playlist?.owner.display_name : 'unknown'}
          </Typography>
          <Typography variant='subtitle1' sx={{ color: 'white' }}>
             • {playlist?.tracks?.total} songs
          </Typography>
        </Box>
      </Grid>
    </PlaylistHeader>
  )
}


export default PlayListDetailPage;
