import { styled, Link, Typography, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px',
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
      <ul>
            <NavLink to="/playlist/:id">
        <BookmarkIcon sx={{marginRight:'20px'}} />
              <Typography variant="h2" fontWeight={700}>
                Your Library
              </Typography>
            </NavLink>
            <Button onClick={handleCreatePlayList}>
                  <AddIcon />
            </Button>
          </ul>
  )
}

export default LibraryHead
