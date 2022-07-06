import {
  ISpotifyAlbum,
  ISpotifyPlaylist,
  Track,
  ISpotifyTopTrack,
} from './../../types/spotifyTypes.d';
import React, { createContext } from 'react';
import { IPlaylistContext } from '../../types';

export const UserQueuePlaylist = createContext<{
  state: IPlaylistContext;
  dispatchPlaylist: React.Dispatch<{
    type: string;
    payload?: {
      track?: Track;
      playlist?: ISpotifyAlbum | ISpotifyPlaylist | ISpotifyTopTrack;
      type?: string;
    };
  }>;
}>({
  state: {
    userPlaylist: [],
  },
  dispatchPlaylist: () => null,
});

export const AlbumPlaylistContext = createContext<{
  albumList?: ISpotifyAlbum;
  playList?: ISpotifyPlaylist;
  trackList?: ISpotifyTopTrack;
}>({});
