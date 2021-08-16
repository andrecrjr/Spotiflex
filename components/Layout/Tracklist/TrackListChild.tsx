import React, { memo } from 'react';
import { ITracklist } from '../../../types/spotifyTypes';
import { msToTime } from '../../utils';

const TrackListChild: React.FC<{ track: ITracklist }> = memo(({ track }) => {
  return (
    <>
      <span>▷</span>
      <div className={`tracklist__item--child`}>
        <h4 className={`track--name ${track.name.length > 18 && 'big-title'}`}>
          {track.name}
        </h4>
        <h5>{msToTime(track.duration_ms)}</h5>
      </div>
    </>
  );
});

export default TrackListChild;
