import React, { memo } from 'react';
import { ITracklist } from '../../../types/spotifyTypes';

const TrackListChild: React.FC<{ track: ITracklist }> = memo(({ track }) => {
  return (
    <>
      <span>play!</span>
      <h4>{track.name}</h4>
    </>
  );
});

export default TrackListChild;
