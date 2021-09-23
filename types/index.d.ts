import type { ISpotifyAlbum, ISpotifyPlaylist, Track } from './spotifyTypes';
export interface TokenSpotify {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface PlaylistItems {
  name: '';
  image: {};
  href: '';
  id: '';
  icons: [
    {
      url: '';
      height: number;
      width: number;
    }
  ];
}

interface QueueList {
  nowPlaying: boolean;
}

export interface IPlaylistContext {
  userPlaylist?: (Track & QueueList)[];
}

export { ISpotifyAlbum, ISpotifyPlaylist, IPlaylistContext };
