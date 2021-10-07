import {
  ISpotifyAlbum,
  ISpotifyPlaylist,
  typeOfTracklist,
} from './../../types/spotifyTypes.d';
import { IPlaylistContext, QueuePlaylist } from '../../types';
import { Track } from '../../types/spotifyTypes';
export const initialPlaylist: IPlaylistContext = {
  userPlaylist: [],
};

type controlPlaylist = 'ADD_PLAYLIST' | 'REMOVE_PLAYLIST' | 'NEXT_TRACK';

export const playlistReducer = (
  state = initialPlaylist,
  action: {
    type: controlPlaylist;
    payload?: {
      track: Track & QueuePlaylist;
      playlist: ISpotifyPlaylist | ISpotifyAlbum;
      type?: typeOfTracklist;
    };
  }
): IPlaylistContext => {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      const data = rearrangePlaylistData(
        action.payload.playlist,
        action.payload.track
      );
      return {
        ...state,
        userPlaylist: data,
        queueType: action.payload.type,
        nowPlayTrack: action.payload.track,
      };
    case 'NEXT_TRACK':
      const nextIdSong = state.userPlaylist.findIndex(
        (item) => item.nowPlaying === true
      );
      if (!(nextIdSong + 1 > state.userPlaylist.length - 1)) {
        const nextPlaylistData = nextTrackPlaylistData(
          state.userPlaylist,
          state.queueType === 'album'
            ? state.userPlaylist[nextIdSong + 1]
            : state.userPlaylist[nextIdSong + 1].track,
          state.queueType
        );
        return {
          ...state,
          userPlaylist: nextPlaylistData,
          nowPlayTrack: state.userPlaylist[nextIdSong + 1].track,
        };
      } else {
        return {
          ...state,
          userPlaylist: [],
          nowPlayTrack: null,
        };
      }
    default:
      return state;
  }
};

const nextTrackPlaylistData = (
  playlist: QueuePlaylist,
  track: Track,
  type?: typeOfTracklist
): QueuePlaylist => {
  if (type === 'album') {
    const data = playlist.map((item) => {
      if (item.id === track.id) {
        return { ...item, nowPlaying: true };
      } else {
        return { ...item, nowPlaying: false };
      }
    });
    return data;
  }
  const data = playlist.map((item) => {
    if (item.track.id === track.id) {
      return { ...item, nowPlaying: true };
    } else {
      return { ...item, nowPlaying: false };
    }
  });
  return data;
};
const rearrangePlaylistData = (
  playlist: ISpotifyPlaylist | ISpotifyAlbum,
  track?: Track
) => {
  const data = playlist.tracks.items.map((item) => {
    if (playlist.type === 'album') {
      if (item.id === track.id) {
        return { ...item, nowPlaying: true };
      } else {
        return { ...item, nowPlaying: false };
      }
    } else if (playlist.type === 'playlist') {
      if (item.track.id === track.id) {
        return { ...item, nowPlaying: true };
      } else {
        return { ...item, nowPlaying: false };
      }
    }
  });
  return data;
};
