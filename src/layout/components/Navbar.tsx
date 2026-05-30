import { Box } from '@mui/material'
import LoginButton from '../../common/components/LoginButton'
import { useGetCurrentUserProfile } from '../../apis/userApi'

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile
  return (
    <Box sx={{ 'display': 'flex', 'justifyContent': 'flex-end', 'alignItems': 'center', 'height': '64px' }}>
      {userProfile ? <img src={userProfile.images.url} /> : <LoginButton />}
    </Box>
  )
}

export default Navbar
