import { Suspense } from 'react'
import { NavLink as RouterNavLink, Outlet } from 'react-router';
import styles from './AppLayout.module.css';
import { styled, Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryHead from './components/LibraryHead';
import Library from './components/Library';

const Sidebar = styled('div')(({ theme }) => ({ 
  width: '331px',
  height: '100%', /* 100vh */
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const NavLink = styled(RouterNavLink)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  margin: '20px 0',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary
  },
  '&.active': {
    color: theme.palette.text.primary
  }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  padding: '20px',
  textAlign: 'center',
  marginBottom: '8px',
  marginRight: '8px',
}));

const AppLayout = () => {
  return (
    <div className={styles.container}>
      <Sidebar>
        <ContentBox>
          <ul className={styles.navList}>
            <NavLink to="/">
            <HomeIcon fontSize="small" />
            <Typography variant="h2" sx={{ fontWeight: 700, marginLeft: '10px' }}>홈</Typography></NavLink>
            <NavLink to="/search">
              <SearchIcon fontSize="small" />
              <Typography variant="h2" sx={{ fontWeight: 700, marginLeft: '10px' }}>검색</Typography>
            </NavLink>
          </ul>
        </ContentBox>
        <ContentBox sx={{ flex: 1, overflow: 'auto' }}>
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>  
      <Suspense fallback={<div>로딩중...</div>}>
        <Outlet />
      </Suspense>
    </div >
   
  )
}

export default AppLayout
