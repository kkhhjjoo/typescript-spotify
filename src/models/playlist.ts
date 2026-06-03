import type { ApiResponse } from './apiResponse';
import type { ExternalUrls, Image, Owner } from './commonType';

export interface GetCurrentUserPlaylistRequest { 
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>

export interface SimplifiedPlaylist { 
  collaborative?: boolean;
  description?: string;
  external_urls: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string; 
  owner: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: {
    href?: string;
    total?: number;
  };
  type?: string;
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