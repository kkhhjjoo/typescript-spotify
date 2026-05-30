import axios from 'axios';
import type { ClientCredentialTokenResponse, ExchangeTokenResponse, PKCETokenResponse } from '../models/auth';
import { CLIENT_ID, CLIENT_SECRET, redirectUri } from '../configs/authConfig';
import { REDIRECT_URI } from '../configs/commonConfig';

const SCOPES = 'user-read-private user-read-email user-library-read';

const base64urlEncode = (bytes: Uint8Array): string =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

const generateCodeVerifier = (): string => {
  const array = new Uint8Array(64);
  crypto.getRandomValues(array);
  return base64urlEncode(array);
};

const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64urlEncode(new Uint8Array(digest));
};

export const loginWithPKCE = async (): Promise<void> => {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  sessionStorage.setItem('code_verifier', verifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: SCOPES,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params}`;
};

export const refreshAccessToken = async (refreshToken: string): Promise<PKCETokenResponse> => {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
  });
  const response = await axios.post('https://accounts.spotify.com/api/token', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data;
};

export const exchangeCodeForToken = async (code: string): Promise<PKCETokenResponse> => {
  const verifier = sessionStorage.getItem('code_verifier');
  console.log('[auth] redirectUri:', redirectUri, '| verifier exists:', !!verifier);
  if (!verifier) throw new Error('No code verifier found');

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: CLIENT_ID,
    code_verifier: verifier,
  });

  const response = await axios.post('https://accounts.spotify.com/api/token', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  sessionStorage.removeItem('code_verifier');
  return response.data;
};

export const debugTokenError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('[auth] token exchange failed:', error.response?.status, error.response?.data);
  }
};

const encodedBase64 = (data: string): string => {
  // if (typeof window !== 'undefined') {
  //   //브라우저 환경
  //   return btoa(data);
  // } else { 
  //   //Node.js 환경
  //   return ArrayBuffer.from(data).toString('base64')
  // }
  return btoa(data);
};

export const getClientCredentialToken = async ():Promise<ClientCredentialTokenResponse> => {
  try {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
    });
    const response = await axios.post('https://accounts.spotify.com/api/token', body, {
      headers: {
        Authorization: `Basic ${encodedBase64(CLIENT_ID + ':' + CLIENT_SECRET)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('[clientCredential] status:', error.response?.status, '| body:', error.response?.data, '| CLIENT_ID empty?', !CLIENT_ID, '| CLIENT_SECRET empty?', !CLIENT_SECRET);
    }
    throw new Error('Fail to fetch client credential token', { cause: error });
  }
};

export const exchangeToken = async (code: string, codeVerifier: string):Promise<ExchangeTokenResponse> => { 
  try {
    const url = 'https://accounts.spotify.com/api/token';
    if (!CLIENT_ID || !REDIRECT_URI) { 
      throw new Error('Missing required parameters');
    }
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) { 
    throw new Error('Fail to fetch token', {cause: error})
  }
}