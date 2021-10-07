import React, { memo } from 'react';
import { Track } from '../../../types/spotifyTypes';
import { msToTime } from '../../utils';
import { TrackPlayer } from './TrackPlayer';

const TrackListChild: React.FC<{
  track?: Track;
}> = memo(({ track }) => {
  return <TrackChild track={track} />;
});

const TrackChild: React.FC<{ track: Track }> = ({ track }) => {
  return (
    <>
      <span className='tracklist__item--play'>
        <TrackPlayer track={track} isFooter={false} />
      </span>
      <div className={`tracklist__item--child`}>
        <h4 className={`track--name ${'big-title'}`}>{track.name}</h4>
        <h5>{msToTime(track.duration_ms)}</h5>
      </div>
    </>
  );
};

TrackListChild.displayName = 'TracklistChild';

export default TrackListChild;
