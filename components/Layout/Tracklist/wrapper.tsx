import React, { useState } from 'react';
import TrackListHeader from './TrackListHeader';
import Tracklist from './index';
import { ISpotifyAlbum, ISpotifyPlaylist } from '../../../types';

const TrackListWrapper: React.FC<{
  album?: ISpotifyAlbum;
  playlist?: ISpotifyPlaylist;
}> = ({ album, playlist }) => {
  const [trackIsNull] = useState(
    playlist?.tracks.items.filter((item) => item.track !== null) ||
      album?.tracks.items.filter((item) => item.track !== null)
  );

  return (
    <>
      <TrackListHeader album={album} playlist={playlist} />
      {trackIsNull.length === 0 ? (
        <p>This page has no preview urls so it'll not work, sorry for that.</p>
      ) : (
        <Tracklist albumList={album} playList={playlist} />
      )}
    </>
  );
};

export default TrackListWrapper;
