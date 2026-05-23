import { Suspense } from 'react'
import { Outlet } from 'react-router'

const AppLayout = () => {
  return (
    <div>
      사이드바
      <Suspense fallback={<div>로딩중...</div>}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default AppLayout
