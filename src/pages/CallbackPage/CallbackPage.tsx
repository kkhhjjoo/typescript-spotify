import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { exchangeCodeForToken, debugTokenError } from '../../apis/authApi';
import { useAuth } from '../../hooks/useAuth';

const CallbackPage = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();
  const hasExchanged = useRef(false);

  useEffect(() => {
    if (hasExchanged.current) return;
    hasExchanged.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (error || !code) {
      navigate('/');
      return;
    }

    exchangeCodeForToken(code)
      .then((data) => {
        saveToken(data.access_token, data.refresh_token);
        navigate('/');
      })
      .catch((err) => { debugTokenError(err); navigate('/'); });
  }, []);

  return <div>로그인 중...</div>;
};

export default CallbackPage;
