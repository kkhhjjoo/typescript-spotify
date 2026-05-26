import { styled, Typography } from '@mui/material';
import PlayButton from '../../../pages/HomePage/components/PlayButton';
import styles from './Card.module.css';

const CardContainer = styled('div')(({ theme }) => ({
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  cursor: 'pointer',
  '&:hover': {
    background: theme.palette.action.hover,
  },
}));

interface CardProps {
  name: string | undefined;
  image: string | undefined;
  artistName?: string | undefined;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <CardContainer>
      <div className={styles.imageContainer}>
        <img className={styles.albumImage} src={image} alt={name} />
        <div className={styles.overlay}>
          <PlayButton />
        </div>
      </div>
      <Typography className={styles.trackName}>{name || 'No name'}</Typography>
      <Typography className={styles.artistName} color="text.secondary">
        {artistName || 'No artist'}
      </Typography>
    </CardContainer>
  );
};

export default Card;
