import type { Artist } from './artist';
import type { ExternalUrls, Image } from './commonType';

export interface Track { 
  album?: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image;
    name?: string;
    release_date: string;
    release_date_prevision: string;
    restrictions?: {
      reason?: string
    };
    type: string;
    uri: string;
  }  
    artists?: Artist[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: {
      isrc?: string;
      ean?: string;
      upc?: string;
    };
    is_playable?: boolean;
    linked_from?: Track;
    type?: 'track';
    popularity?: number;
    preview_url?: string | null;
    track_number?: number;
    name?: string;
    is_local?: boolean;
}

export interface Episode {
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_prevision: string;
  type: 'episode';
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  uri: string;
  restrictions?: {
    reason?: string;
  };
  show: {
    available_markets: string[];
    copyrights: {
      text: string;
      type: 'show';
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
    type: 'show';
    uri: string;
    total_episodes: number;
  }
}