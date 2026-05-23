import { Outlet } from 'react-router'

const AppLayout = () => {
  return (
    <div>
      사이드바
      <Outlet />
    </div>
  )
}

export default AppLayout
