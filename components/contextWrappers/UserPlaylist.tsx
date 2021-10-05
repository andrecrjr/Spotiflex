import React, { useReducer } from 'react';
import { UserQueuePlaylist } from '../context/';
import { initialPlaylist, playlistReducer } from '../reducer/PlaylistReducer';

//not using yet
export const UserPlaylistWrapper: React.FC = ({ children }) => {
  const [state, dispatchPlaylist] = useReducer(
    playlistReducer,
    initialPlaylist
  );

  return (
    <UserQueuePlaylist.Provider value={{ state, dispatchPlaylist }}>
      {children}
    </UserQueuePlaylist.Provider>
  );
};
