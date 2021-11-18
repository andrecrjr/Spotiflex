import {
  ISpotifyAlbum,
  ISpotifyPlaylist,
  typeOfTracklist,
  ISpotifyAllTrackList,
} from './../../types/spotifyTypes.d';
import { IPlaylistContext, QueuePlaylist } from '../../types';
import { Track } from '../../types/spotifyTypes';
import { getOrMountPlaylist } from '../utils';
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
      playlist: ISpotifyAllTrackList;
      type?: typeOfTracklist;
    };
  }
): IPlaylistContext => {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      const playlist = getOrMountPlaylist(action.payload.playlist);
      const data = rearrangePlaylistData(playlist, action.payload.track);
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

    case 'PREVIOUS_TRACK':
      const nowTrackId = state.userPlaylist.findIndex(
        (item) => item.nowPlaying === true
      );
      if (nowTrackId >= 0) {
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

const goToNextOrPrevTrack = (
  tracklist: QueuePlaylist,
  id: number,
  nextOrPrevious: 'next' | 'previous' = 'next',
  isTracklist: boolean
) => {
  if (nextOrPrevious === 'next') {
    if (id > tracklist.length - 2) {
      return isTracklist ? tracklist[0].track : tracklist[0];
    } else {
      return isTracklist ? tracklist[id + 1].track : tracklist[id + 1];
    }
  }
  if (nextOrPrevious === 'previous') {
    if (id === 0) {
      return isTracklist
        ? tracklist[tracklist.length - 1].track
        : tracklist[tracklist.length - 1];
    }
    return isTracklist ? tracklist[id - 1].track : tracklist[id - 1];
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
      return goToNextOrPrevTrack(playlist, id, nextOrPrevious);
    case 'tracklist':
      return goToNextOrPrevTrack(playlist, id, nextOrPrevious);
    case 'playlist':
      return goToNextOrPrevTrack(playlist, id, nextOrPrevious, true);
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
    case 'tracklist':
      const dataTracklist = playlist.map((item) => {
        if (item.id === track.id) {
          return { ...item, nowPlaying: true };
        } else {
          return { ...item, nowPlaying: false };
        }
      });
      return dataTracklist;
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
    if (playlist.type === 'album' || playlist.type === 'tracklist') {
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
