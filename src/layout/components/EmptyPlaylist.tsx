import { styled, Button, Card, Typography } from "@mui/material";

const EmptyPlayListCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.main,
  padding: '20px',
  borderRadius: '8px'
}));

const EmptyPlaylist = () => {
  return (
    <EmptyPlayListCard>
      <Typography variant="h2" sx={{ fontWeight: 700, marginBottom: '20px' }}>
        첫번째 플레이리스트를 만들어보세요.
      </Typography>
      <Typography variant='body2'>It's easy, we'll help you</Typography>
      <Button variant='contained' color='secondary' sx={{marginTop: '20px'}}>
        PlayList 추가
      </Button>
    </EmptyPlayListCard>
  )
}

export default EmptyPlaylist
