import { IPlaylistContext } from '../../types';
import { Track } from '../../types/spotifyTypes';
export const initialPlaylist = {
  userPlaylist: [],
};

type controlPlaylist = 'ADD_PLAYLIST' | 'REMOVE_PLAYLIST';

export const playlistReducer = (
  state = initialPlaylist,
  action: {
    type: controlPlaylist;
    payload: Track;
  }
): IPlaylistContext => {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      return {
        ...state,
        ...{ userPlaylist: [...state.userPlaylist, action.payload] },
      };
    default:
      return state;
  }
};
