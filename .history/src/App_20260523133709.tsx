import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';


//0. 사이드바 있어야함(플레이리스트, 메뉴)
//1. 홈페이지(랜딩페이지) /
//2. search페이지 /search
//3. 서치 결과 페이지 /search/:keyword
//4. 플레이리스트 상세 /playlist/:id
//5. (모바일버전)플레이리스트 보여주는 페이지 /playlist

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
]);
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
