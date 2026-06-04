import type { ApiResponse } from './apiResponse';
import type { Artist } from './artist';
import type { ExternalUrls, Followers, Image, Owner } from './commonType';
import type { Episode, Track } from './track';

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


export interface GetPlaylistRequest {
  playlistId: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest { 
  offset?: number;
  limit?: number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

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
  track: Track | Episode
}

export interface CreatePlaylistRequest { 
  name: string;
  playlistPublic?: boolean;
  collaborative?: boolean;
  description?: string;
}