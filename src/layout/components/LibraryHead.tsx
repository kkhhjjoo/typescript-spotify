import { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router';
import { styled, Typography, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CreatePlaylistDialog from '../../common/components/CreatePlaylistDialog';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import { useAuth } from '../../hooks/useAuth';
import { loginWithPKCE } from '../../apis/authApi';

import styles from './LibraryHead.module.css';
import useGetCurrentProfile from '../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../utils/auth';

const NavLink = styled(RouterNavLink)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  flex: 'none',
  gap: '20px',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary
  },
  '&.active': {
    color: theme.palette.text.primary
  }
}));

const LibraryHead = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending, isError, error, reset } = useCreatePlaylist();
  const { logout } = useAuth();

  const is403 = isError && axios.isAxiosError(error) && error.response?.status === 403;

  const handleConfirm = (name: string) => {
    mutate(name, { onSuccess: () => { setOpen(false); reset(); } });
  };

  const handleClose = () => { setOpen(false); reset(); };

  const handleRelogin = () => {
    logout();
    loginWithPKCE();
  };

  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data: userProfile } = useGetCurrentProfile();

  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: '나의 플레이리스트' });
    } else {
      getSpotifyAuthUrl();
    }
  }

  return (
    <>
      <ul className={styles.flex}>
        <NavLink to="/playlist">
          <BookmarkIcon />
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Your Library
          </Typography>
        </NavLink>
        <Button sx={{ marginLeft: '50px' }} onClick={handleCreatePlaylist}>
          <AddIcon />
        </Button>
      </ul>
      <CreatePlaylistDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onRelogin={handleRelogin}
        isLoading={isPending}
        isPermissionError={is403}
      />
    </>
  );
};

export default LibraryHead;
