import { useState } from 'react'
import { Box, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useQueryClient } from '@tanstack/react-query'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentProfile from '../../hooks/useGetCurrentUserProfile'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const { data: userProfile } = useGetCurrentProfile();
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const profileImage = userProfile?.images?.[0]?.url;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    queryClient.removeQueries({ queryKey: ['current-user-profile'] });
    handleClose();
  };

  const avatar = profileImage
    ? <img src={profileImage} alt={userProfile?.display_name ?? 'profile'} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} />
    : <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'grey.600', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, cursor: 'pointer' }}>{userProfile?.display_name?.[0]?.toUpperCase() ?? '?'}</Box>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '64px', px: 2 }}>
      {userProfile
        ? <>
            <Box onClick={handleOpen}>{avatar}</Box>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
              {userProfile.display_name && (
                <MenuItem disabled sx={{ opacity: '1 !important' }}>
                  <Typography variant="body2" color="text.secondary">{userProfile.display_name}</Typography>
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                로그아웃
              </MenuItem>
            </Menu>
          </>
        : <LoginButton />
      }
    </Box>
  )
}

export default Navbar
