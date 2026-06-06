import type { SimplifiedPlaylist } from '../models/playlist';
import type { Track } from '../models/track';

const KEY = 'local_playlists';
const TRACKS_KEY = 'local_playlist_tracks';

export const getLocalPlaylists = (): SimplifiedPlaylist[] => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); }
  catch { return []; }
};

export const addLocalPlaylist = (name: string): SimplifiedPlaylist => {
  const list = getLocalPlaylists();
  const playlist: SimplifiedPlaylist = {
    id: `local-${Date.now()}`,
    name,
    images: [],
    external_urls: { spotify: '' },
    owner: { display_name: 'Me', id: 'local', external_urls: { spotify: '' }, href: '', type: 'user', uri: '' },
    tracks: { href: '', total: 0 },
  };
  localStorage.setItem(KEY, JSON.stringify([...list, playlist]));
  return playlist;
};

export interface LocalTrack {
  track: Track;
  added_at: string;
}

const getAllLocalTracks = (): Record<string, LocalTrack[]> => {
  try { return JSON.parse(localStorage.getItem(TRACKS_KEY) ?? '{}'); }
  catch { return {}; }
};

export const getLocalPlaylistTracks = (playlistId: string): LocalTrack[] => {
  return getAllLocalTracks()[playlistId] ?? [];
};

export const addTrackToLocalPlaylist = (playlistId: string, track: Track): void => {
  const all = getAllLocalTracks();
  const existing = all[playlistId] ?? [];
  all[playlistId] = [...existing, { track, added_at: new Date().toISOString() }];
  localStorage.setItem(TRACKS_KEY, JSON.stringify(all));
};
