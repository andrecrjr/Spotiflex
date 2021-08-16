import React from 'react';
import TrackListHeader from './TrackListHeader';
import Tracklist from './index';
import { ISpotifyAlbum } from '../../../types';

const TrackListWrapper: React.FC<{ album: ISpotifyAlbum }> = ({ album }) => {
  return (
    <>
      <TrackListHeader album={album} />
      <Tracklist list={album} />
    </>
  );
};

export default TrackListWrapper;
