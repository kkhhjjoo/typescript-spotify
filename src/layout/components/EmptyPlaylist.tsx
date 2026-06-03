import { useState } from 'react';
import { styled, Button, Card, Typography } from "@mui/material";
import axios from 'axios';
import CreatePlaylistDialog from '../../common/components/CreatePlaylistDialog';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import { useAuth } from '../../hooks/useAuth';
import { loginWithPKCE } from '../../apis/authApi';

const EmptyPlayListCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.main,
  padding: '20px',
  borderRadius: '8px'
}));

const EmptyPlaylist = () => {
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

  return (
    <>
      <EmptyPlayListCard>
        <Typography variant="h2" sx={{ fontWeight: 700, marginBottom: '20px' }}>
          첫번째 플레이리스트를 만들어보세요.
        </Typography>
        <Typography variant='body2'>It's easy, we'll help you</Typography>
        <Button variant='contained' color='secondary' sx={{ marginTop: '20px' }} onClick={() => setOpen(true)}>
          PlayList 추가
        </Button>
      </EmptyPlayListCard>
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

export default EmptyPlaylist;
