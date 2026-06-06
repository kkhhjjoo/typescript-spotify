import { useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { getLocalPlaylists, getLocalPlaylistTracks } from '../../utils/localPlaylistManager';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Button, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Grid } from '@mui/system';
import DefaultImage from '../../common/components/DefaultImage';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';
import EmptyPlaylistWithSearch from './components/EmptyPlaylistWithSearch';
import { useAuth } from '../../hooks/useAuth';
import { loginWithPKCE } from '../../apis/authApi';

const PlaylistHeader = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(transparent 0, rgba(0,0,0,.5) 100%)',
  padding: '16px',
  gap: '24px',
});

const AlbumImage = styled('img')(({ theme }) => ({
  borderRadius: '8px',
  width: '160px',
  height: '160px',
  objectFit: 'cover',
  [theme.breakpoints.down('md')]: {
    width: '120px',
    height: '120px',
  },
}));

const PlaylistTitle = styled('h2')({
  margin: 0,
  fontSize: '2rem',
  fontWeight: 700,
  color: 'white',
});

const PlaylistMeta = styled('p')({
  margin: '4px 0 0',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.9rem',
});

const PlayListDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showSearch, setShowSearch] = useState(false);
  const { token } = useAuth();

  const isLocal = id?.startsWith('local-');
  const localPlaylist = isLocal ? getLocalPlaylists().find(p => p.id === id) : undefined;

  const { data: playlist, error: playlistError } = useGetPlaylist({ playlistId: isLocal ? '' : (id ?? '') });
  const { data: playlistItems, error: itemsError } = useGetPlaylistItems({
    playlistId: isLocal ? '' : (id ?? ''),
    limit: PAGE_LIMIT,
    offset: 0,
  });

  if (id === undefined) return <Navigate to="/" />;

  if (!token) {
    return (
      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        <p style={{ marginBottom: '16px' }}>로그인이 필요해요.</p>
        <Button variant="contained" onClick={loginWithPKCE}>로그인</Button>
      </div>
    );
  }

  if (!isLocal && (playlistError || itemsError)) return <ErrorMessage errorMessage="플레이리스트를 불러올 수 없어요." />;

  const localTracks = isLocal && id ? getLocalPlaylistTracks(id) : [];
  const displayName = isLocal ? (localPlaylist?.name ?? '로컬 플레이리스트') : (playlist?.name ?? '플레이리스트');
  const coverUrl = !isLocal ? playlist?.images?.[0]?.url : undefined;
  const totalTracks = isLocal ? localTracks.length : (playlist?.track?.total ?? 0);

  return (
    <div>
      <PlaylistHeader>
        {coverUrl ? (
          <AlbumImage src={coverUrl} alt="playlist_cover" />
        ) : (
          <DefaultImage><MusicNoteIcon fontSize="large" /></DefaultImage>
        )}
        <div>
          <PlaylistTitle>{displayName}</PlaylistTitle>
          <PlaylistMeta>
            {isLocal ? 'Me' : (playlist?.owner?.display_name ?? 'unknown')} • {totalTracks}곡
          </PlaylistMeta>
          <Button variant="contained" size="small" sx={{ mt: 2 }}
            onClick={() => setShowSearch((prev) => !prev)}>
            {showSearch ? '검색 닫기' : '+ 노래 추가'}
          </Button>
        </div>
      </PlaylistHeader>

      {showSearch && id && <EmptyPlaylistWithSearch playlistId={id} />}

      {totalTracks === 0 && !showSearch ? (
        <p style={{ textAlign: 'center', color: 'gray', marginTop: '40px' }}>
          아직 노래가 없어요. 위에서 노래를 추가해보세요!
        </p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Date added</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLocal
              ? localTracks.map((item, i) => (
                  <DesktopPlaylistItem item={item} key={i} index={i + 1} />
                ))
              : playlistItems?.pages.map((page, pageIndex) =>
                  page.items.map((item, itemIndex) => (
                    <DesktopPlaylistItem
                      item={item}
                      key={pageIndex * PAGE_LIMIT + itemIndex}
                      index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    />
                  ))
                )
            }
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default PlayListDetailPage;
