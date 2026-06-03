import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';

interface CreatePlaylistDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  onRelogin?: () => void;
  isLoading?: boolean;
  isPermissionError?: boolean;
}

const CreatePlaylistDialog = ({ open, onClose, onConfirm, onRelogin, isLoading, isPermissionError }: CreatePlaylistDialogProps) => {
  const [name, setName] = useState('');

  const handleConfirm = () => {
    if (!name.trim()) return;
    onConfirm(name.trim());
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>새 플레이리스트</DialogTitle>
      <DialogContent>
        {isPermissionError ? (
          <>
            <Typography variant="body2" color="error" sx={{ mb: 1 }}>
              플레이리스트 생성 권한이 없습니다.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              다시 로그인하면 권한이 부여됩니다.
            </Typography>
          </>
        ) : (
          <TextField
            autoFocus
            fullWidth
            label="플레이리스트 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
            sx={{ mt: 1 }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        {isPermissionError ? (
          <Button onClick={onRelogin} variant="contained" color="primary">
            다시 로그인
          </Button>
        ) : (
          <Button onClick={handleConfirm} variant="contained" disabled={!name.trim() || isLoading}>
            만들기
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreatePlaylistDialog;
