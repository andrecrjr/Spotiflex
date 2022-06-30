import { typeOfTrack } from './spotifyTypes.d';
import type {
  ISpotifyAlbum,
  ISpotifyPlaylist,
  Track,
  ISpotifyArtist,
} from './spotifyTypes';
export interface TokenSpotify {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface PlaylistItems {
  name: string;
  image?: {};
  href: string;
  id: string;
  icons: {
    url: string;
    height: number | unknown;
    width: number | unknown;
  }[];
}

interface QueueList {
  nowPlaying?: boolean;
}

type QueuePlaylist = (Track & QueueList)[];

interface IPlaylistContext {
  userPlaylist?: QueuePlaylist;
  nowPlayTrack?: Track;
  queueType?: typeOfTrack;
}

export {
  ISpotifyAlbum,
  ISpotifyPlaylist,
  IPlaylistContext,
  QueuePlaylist,
  ISpotifyArtist,
};
