import React from 'react';
import TrackListHeader from './TrackListHeader';
import Tracklist from './index';
import { ISpotifyAlbum, ISpotifyPlaylist } from '../../../types';

const TrackListWrapper: React.FC<{
  album?: ISpotifyAlbum;
  playlist?: ISpotifyPlaylist;
}> = ({ album, playlist }) => {
  return (
    <>
      <TrackListHeader album={album} playlist={playlist} />
      <Tracklist albumList={album} playList={playlist} />
    </>
  );
};

export default TrackListWrapper;
