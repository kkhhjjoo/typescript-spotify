import { styled } from '@mui/material';
import { useNavigate } from 'react-router';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import Card from '../../common/components/Card/Card';
import { ClipLoader } from 'react-spinners';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';

const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
  gap: '16px',
});

const Title = styled('h2')({
  margin: '0 0 20px 0',
  fontSize: '1.5rem',
  fontWeight: 700,
});

const PlayListPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCurrentUserPlaylists({ limit: 50, offset: 0 });

  if (isLoading) return <ClipLoader size={50} />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <div>
      <Title>내 플레이리스트</Title>
      <Grid>
        {data?.items.map((playlist, i) => (
          <Card
            key={playlist.id ?? i}
            name={playlist.name}
            image={playlist.images?.[0]?.url}
            artistName={playlist.owner?.display_name ?? undefined}
            onClick={() => playlist.id && navigate(`/playlist/${playlist.id}`)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default PlayListPage;
