import { ISpotifyAlbum, ISpotifyPlaylist } from './../../types/spotifyTypes.d';
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
    };
  }
): IPlaylistContext => {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      const data = rearrangePlaylistData(
        action.payload.playlist.tracks.items,
        action.payload.track
      );
      console.log(data);
      return {
        ...state,
        userPlaylist: data,
        nowPlayTrack: action.payload.track,
      };
    case 'NEXT_TRACK':
      const nextIdSong = state.userPlaylist.findIndex(
        (item) => item.nowPlaying === true
      );

      const nextPlaylistData = rearrangePlaylistData(
        state.userPlaylist,
        state.userPlaylist[nextIdSong + 1].track
      );

      return {
        ...state,
        userPlaylist: nextPlaylistData,
        nowPlayTrack: state.userPlaylist[nextIdSong + 1].track,
      };
    default:
      return state;
  }
};

const rearrangePlaylistData = (playlist, track?: Track) => {
  const data = playlist.map((item) => {
    if (item.track.id === track.id) {
      return { ...item, nowPlaying: true };
    } else {
      return { ...item, nowPlaying: false };
    }
  });
  return data;
};
