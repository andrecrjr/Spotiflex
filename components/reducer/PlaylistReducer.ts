import {
  ISpotifyAlbum,
  ISpotifyPlaylist,
  typeOfTracklist,
  ISpotifyTopTrack,
} from './../../types/spotifyTypes.d';
import { IPlaylistContext, QueuePlaylist } from '../../types';
import { Track } from '../../types/spotifyTypes';
export const initialPlaylist: IPlaylistContext = {
  userPlaylist: [],
};

type controlPlaylist =
  | 'ADD_PLAYLIST'
  | 'REMOVE_PLAYLIST'
  | 'NEXT_TRACK'
  | 'PREVIOUS_TRACK';

export const playlistReducer = (
  state = initialPlaylist,
  action: {
    type: controlPlaylist;
    payload?: {
      track: Track & QueuePlaylist;
      playlist: ISpotifyPlaylist | ISpotifyAlbum | ISpotifyTopTrack;
      type?: typeOfTracklist;
    };
  }
): IPlaylistContext => {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      console.log(action.payload.playlist);
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
          getExactlyTrackForPlaylistOrAlbum(
            state.userPlaylist,
            state.queueType,
            nextIdSong
          ),
          state.queueType
        );
        return {
          ...state,
          userPlaylist: nextPlaylistData,
          nowPlayTrack: getExactlyTrackForPlaylistOrAlbum(
            state.userPlaylist,
            state.queueType,
            nextIdSong
          ),
        };
      } else {
        return {
          ...state,
          userPlaylist: [],
          nowPlayTrack: null,
        };
      }
    case 'PREVIOUS_TRACK':
      const nowTrackId = state.userPlaylist.findIndex(
        (item) => item.nowPlaying === true
      );
      if (nowTrackId >= 1) {
        const previousPlaylist = nextTrackPlaylistData(
          state.userPlaylist,
          getExactlyTrackForPlaylistOrAlbum(
            state.userPlaylist,
            state.queueType,
            nowTrackId,
            'previous'
          ),
          state.queueType
        );
        return {
          ...state,
          userPlaylist: previousPlaylist,
          nowPlayTrack: getExactlyTrackForPlaylistOrAlbum(
            state.userPlaylist,
            state.queueType,
            nowTrackId,
            'previous'
          ),
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

const getExactlyTrackForPlaylistOrAlbum = (
  playlist: QueuePlaylist,
  type: typeOfTracklist,
  id: number,
  nextOrPrevious: 'next' | 'previous' = 'next'
) => {
  switch (type) {
    case 'album':
      if (nextOrPrevious === 'next') return playlist[id + 1];
      return playlist[id - 1];
    case 'playlist':
      if (nextOrPrevious === 'next') return playlist[id + 1].track;
      return playlist[id - 1].track;
  }
};

const nextTrackPlaylistData = (
  playlist: QueuePlaylist,
  track: Track,
  type?: typeOfTracklist
): QueuePlaylist => {
  switch (type) {
    case 'album':
      const data = playlist.map((item) => {
        if (item.id === track.id) {
          return { ...item, nowPlaying: true };
        } else {
          return { ...item, nowPlaying: false };
        }
      });
      return data;
    case 'playlist':
      const dataPlaylist = playlist.map((item) => {
        if (item.track.id === track.id) {
          return { ...item, nowPlaying: true };
        } else {
          return { ...item, nowPlaying: false };
        }
      });
      return dataPlaylist;
    default:
      const dataDefault = playlist.map((item) => {
        if (item.track.id === track.id) {
          return { ...item, nowPlaying: true };
        } else {
          return { ...item, nowPlaying: false };
        }
      });
      return dataDefault;
  }
};

const rearrangePlaylistData = (
  playlist: ISpotifyPlaylist | ISpotifyAlbum,
  track?: Track
) => {
  const data = playlist.tracks.items.map((item: Track) => {
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
