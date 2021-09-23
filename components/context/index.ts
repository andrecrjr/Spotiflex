import {
  ISpotifyAlbum,
  ISpotifyPlaylist,
  Track,
} from './../../types/spotifyTypes.d';
import React, { createContext } from 'react';
import { IPlaylistContext } from '../../types';

export const UserQueuePlaylist = createContext<{
  state: IPlaylistContext;
  dispatchPlaylist: React.Dispatch<{ type: string; payload: Track }>;
}>({
  state: {
    userPlaylist: [],
  },
  dispatchPlaylist: () => null,
});

export const AlbumPlaylistContext = createContext<{
  albumList?: ISpotifyAlbum | Record<string, unknown>;
  playList?: ISpotifyPlaylist | Record<string, unknown>;
}>({ albumList: {}, playList: {} });
