import React from 'react';
import TrackListHeader from './TrackListHeader';
import Tracklist from './index';
import { ISpotifyAlbum, ISpotifyPlaylist } from '../../../types';

const TrackListWrapper: React.FC<{
  album?: ISpotifyAlbum;
  playlist?: ISpotifyPlaylist;
}> = ({ album }) => {
  return (
    <>
      <TrackListHeader album={album} />
      <Tracklist list={album} />
    </>
  );
};

export default TrackListWrapper;
