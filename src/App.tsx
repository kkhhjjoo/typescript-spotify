import { RouterProvider } from 'react-router';
import { router } from './route';
import './App.css';
import { CLIENT_ID } from './configs/authConfig';
import useExchangeToken from './hooks/useExchangeToken';
import { useEffect } from 'react';


//0. 사이드바 있어야함(플레이리스트, 메뉴)
//1. 홈페이지(랜딩페이지) /
//2. search페이지 /search
//3. 서치 결과 페이지 /search/:keyword
//4. 플레이리스트 상세 /playlist/:id
//5. (모바일버전)플레이리스트 보여주는 페이지 /playlist


function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  // stored in the previous step
  const codeVerifier = localStorage.getItem('code_verifier');
  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => { 
    if (code && codeVerifier) { 
      exchangeToken({code, codeVerifier})
    }
  }, [code, codeVerifier, exchangeToken])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
