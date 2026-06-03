import { Avatar, ListItemAvatar, ListItemButton, ListItemText, styled, Typography } from '@mui/material';

const PlayListItemContainer = styled(ListItemButton)(({ theme, selected }) => ({
  padding: '8px',
  alignItems: 'center',
  borderRadius: '8px',
  background: selected ? theme.palette.action.active : '',
  '&:hover': {
    background: theme.palette.action.hover
  }
}));
const PlayListAvatar = styled(Avatar)({
  width: '48px',
  height: '48px',
  borderRadius: '8px'
});

const PlayListName = styled(Typography)({
  fontWeight: 'bold',
  color: '#1db954'
})

interface PlayListItemProps { 
  image: string | null;
  name: string;
  artistName: string | null;
  id: string;
  handleClick: (id: string) => void;
  selected?: boolean;
}

const PlaylistItem = ({image, name, artistName, id, handleClick, selected}: PlayListItemProps) => {
  return (
    <PlayListItemContainer onClick={() => handleClick(id)} selected={selected || false}>
      <ListItemAvatar>
        {image ? <PlayListAvatar src={image} alt={name} /> : 'No Image'}
      </ListItemAvatar>
      <ListItemText primary={<PlayListName>{name}</PlayListName>} secondary={<Typography variant='body1' color="text.secondary">
        {artistName}
      </Typography>} />
    </PlayListItemContainer>
  );
}

export default PlaylistItem
