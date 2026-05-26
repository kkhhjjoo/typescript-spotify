import { Button } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'

const LoginButton = () => {
  const { token, login, logout } = useAuth();

  if (token) {
    return <Button variant="contained" color="secondary" size="large" onClick={logout}>Logout</Button>
  }

  return (
    <Button variant="contained" color="secondary" size="large" onClick={login}>Login</Button>
  )
}

export default LoginButton
