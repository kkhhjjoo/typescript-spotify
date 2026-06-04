import type { SimplifiedAlbum } from './album';
import type { ApiResponse } from './apiResponse';
import type { Artist } from './artist';
import type { SimplifiedPlaylist } from './playlist';
import type { Show, SimplifiedAudioBook, SimplifiedEpisode, Track } from './track';

export const SEARCH_TYPE = {
  Track: "track",
  Album: "album",
  Playlist: "playlist",
  Show: "show",
  Episode: "episode",
  AudioBook: "audiobook",
  Artist: "artist",
} as const;

export type SearchType = typeof SEARCH_TYPE[keyof typeof SEARCH_TYPE];

export interface SearchRequestParams {
  q: string;
  type: SearchType[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

export interface SearchResponse { 
  artist?: ApiResponse<Artist>;
  albums?: ApiResponse<SimplifiedAlbum>;
  tracks?: ApiResponse<Track>;
  playlists?: ApiResponse<SimplifiedPlaylist>;
  show?: ApiResponse<Show>;
  episode?: ApiResponse<SimplifiedEpisode>;
  audiobook?: ApiResponse<SimplifiedAudioBook>
}