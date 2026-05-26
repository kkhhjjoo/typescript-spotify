export const CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID ?? '';
export const CLIENT_SECRET = process.env.VITE_SPOTIFY_SECRET_KEY ?? '';
export const redirectUri = process.env.VITE_REDIRECT_URI ?? 'http://127.0.0.1:3000/callback';