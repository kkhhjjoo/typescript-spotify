import type { ApiResponse } from './apiResponse';
import type { Artist } from './artist';
import type { ExternalUrls, Followers, Image, Owner } from './commonType';

export interface GetCurrentUserPlaylistRequest { 
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>

export interface BasePlaylist { 
  collaborative?: boolean;
  description?: string | null;
  external_urls: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string; 
  owner: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: 'playlist';
  uri?: string;
}
export interface SimplifiedPlaylist extends BasePlaylist { 
  
  tracks?: {
    href?: string;
    total?: number;
  };
  
}

export interface IPlaylistImage { 
  url: string;
  height: number | null;
  width: number | null;
}

export interface IPlaylistOwner { 
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: 'user',
  uri: string;
  display_name: string | null;
}

export interface IPlaylistItems { 
  href: string;
  total: number;
}

export interface IPlaylist {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: IPlaylistImage[];
  name: string;
  owner: IPlaylistOwner;
  public: boolean | null;
  snapshot_id: string;
  items: IPlaylistItems;
  tracks?: IPlaylistItems;
  type: string;
  uri: string;
}
export interface Playlist extends BasePlaylist { 
  track: ApiResponse<PlaylistTrack>
  followers: Followers;
}

export interface PlaylistTrack { 
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track: Track | Episode;
}

export interface Track { 
  album: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image;
    name: string;
    release_date: string;
    release_date_prevision: string;
    restrictions?: {
      reason?: string
    };
    type: string;
    uri: string;
  }  
    artists?: Artist;
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: {
      isrc?: string;
      ean?: string;
      upc?: string;
    };
    is_playable?: boolean;
    linked_from?: {

    };
    popularity?: number;
    preview_url?: string | null;
    track_number?: number;
    is_local?: boolean;
}

export interface Episode {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image;
  is_externally_hosted: boolean;
  is_playable: boolean;
  language?: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_prevision: string;
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: string;
  uri: string;
  restrictions?: {
    reason?: string;
  };
  show: {
    available_markets: string[];
    copyrights: {
      text: string;
      type: string;
    };
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image;
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: string;
    uri: string;
    total_episodes: number;
  }
}
export interface GetPlaylistRequest {
  playlistId: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}