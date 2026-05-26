import { NavLink as RouterNavLink } from 'react-router';
import { styled, Typography, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';

import styles from './LibraryHead.module.css';

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
  const handleCreatePlayList = () => {

  }
  return (
      <ul className={styles.flex}>
        <NavLink to="/playlist">
          <BookmarkIcon />
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Your Library
          </Typography>
        </NavLink>
        <Button sx={{ marginLeft: '50px' }} onClick={handleCreatePlayList}>
          <AddIcon />
        </Button>
      </ul>
  )
}

export default LibraryHead
