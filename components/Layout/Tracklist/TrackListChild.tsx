import React, { memo } from 'react';
import { InfoTrack } from '../../../types/spotifyTypes';
import { msToTime } from '../../utils';
import { TrackPlayer } from './TrackPlayer';

const TrackListChild: React.FC<{
  track?: InfoTrack;
}> = memo(({ track }) => {
  return <TrackChild track={track} />;
});

const TrackChild: React.FC<{ track: InfoTrack }> = ({ track }) => {
  return (
    <>
      <span className='tracklist__item--play'>
        <TrackPlayer track={track} isFooter={false} />
      </span>
      <div className={`tracklist__item--child`}>
        <h4 className={`track--name ${'big-title'}`}>{track.name}</h4>
        <h5 className='track--time'>{msToTime(track.duration_ms)}</h5>
      </div>
    </>
  );
};

TrackListChild.displayName = 'TracklistChild';

export default TrackListChild;
