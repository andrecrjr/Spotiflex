import React, { useContext, useEffect, useState } from 'react';
import { Track } from '../../../types/spotifyTypes';
import { UserQueuePlaylist } from '../../context';
import { motion } from 'framer-motion';
import { TrackPlayer } from './TrackPlayer';

const variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.5,
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

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
        <motion.div
          key={'trackplayer song'}
          variants={variants}
          animate='in'
          initial='out'
          exit='out'
          className='track--footer'
        >
          <TrackPlayer track={state.nowPlayTrack} isFooter={true} />
        </motion.div>
      ) : null}
    </>
  );
};
