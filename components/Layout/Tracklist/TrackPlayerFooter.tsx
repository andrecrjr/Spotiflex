import React, { useContext, useEffect, useState } from 'react';
import { ISpotifyAlbum, ISpotifyPlaylist } from '../../../types';
import { UserQueuePlaylist } from '../../context';
import { TrackPlayer } from './TrackPlayer';

interface Props {}

export const TrackPlayerFooter = (props: Props) => {
  const { state } = useContext(UserQueuePlaylist);
  const [nowPlaying, setNowPlaying] = useState<
    ISpotifyPlaylist | ISpotifyAlbum | {}
  >({});
  useEffect(() => {
    if (state.nowPlayTrack) {
      setNowPlaying(state.nowPlayTrack);
    }
  }, [state.nowPlayTrack]);

  return (
    <>
      {Object.keys(nowPlaying).length > 0 ? (
        <div className='track--footer'>
          <TrackPlayer track={state.nowPlayTrack} isFooter={true} />
        </div>
      ) : null}
    </>
  );
};
