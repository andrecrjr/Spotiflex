import React, { useContext, useEffect, useState } from 'react';
import { Track } from '../../../types/spotifyTypes';
import { UserQueuePlaylist } from '../../context';
import { TrackPlayer } from './TrackPlayer';

export const TrackPlayerFooter: React.FC = () => {
  const { state } = useContext(UserQueuePlaylist);
  const [nowPlaying, setNowPlaying] = useState<Track>(null);

  useEffect(() => {
    if (state.nowPlayTrack) {
      setNowPlaying(state.nowPlayTrack);
    }
  }, [state.nowPlayTrack]);

  return (
    <>
      {nowPlaying ? (
        <div className='track--footer'>
          <TrackPlayer track={state.nowPlayTrack} isFooter={true} />
        </div>
      ) : null}
    </>
  );
};
