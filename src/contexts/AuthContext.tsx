import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { loginWithPKCE } from '../apis/authApi';

const TOKEN_KEY = 'spotify_access_token';
const REFRESH_TOKEN_KEY = 'spotify_refresh_token';

interface AuthContextType {
  token: string | null;
  saveToken: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  login: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    const sync = () => setToken(localStorage.getItem(TOKEN_KEY));
    window.addEventListener('spotify-auth-cleared', sync);
    return () => window.removeEventListener('spotify-auth-cleared', sync);
  }, []);

  const saveToken = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, logout, login: loginWithPKCE }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
