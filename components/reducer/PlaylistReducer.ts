import { ISpotifyAlbum, ISpotifyPlaylist } from './../../types/spotifyTypes.d';
import { IPlaylistContext, QueuePlaylist } from '../../types';
import { Track } from '../../types/spotifyTypes';
export const initialPlaylist: IPlaylistContext = {
  userPlaylist: [],
};

type controlPlaylist = 'ADD_PLAYLIST' | 'REMOVE_PLAYLIST';

export const playlistReducer = (
  state = initialPlaylist,
  action: {
    type: controlPlaylist;
    payload: {
      track: Track & QueuePlaylist;
      playlist: ISpotifyPlaylist | ISpotifyAlbum;
    };
  }
): IPlaylistContext => {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      const data = action.payload.playlist.tracks.items.map((item) => {
        if (item.track.id === action.payload.track.id) {
          return { ...item, nowPlaying: true };
        } else {
          return { ...item, nowPlaying: false };
        }
      });

      return {
        ...state,
        userPlaylist: data,
        nowPlayTrack: action.payload.track,
      };
    default:
      return state;
  }
};
