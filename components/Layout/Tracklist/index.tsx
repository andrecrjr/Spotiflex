import React, { ReactElement } from 'react';
import { ISpotifyAlbum } from '../../../types';
import TrackListChild from './TrackListChild';

const Tracklist: React.FC<{ list: ISpotifyAlbum }> = ({ list }) => {
  return (
    <ul className='tracklist__wrapper'>
      {list.tracks.items.map((item) => {
        return (
          <li className='tracklist__item' key={item.id}>
            <TrackListChild track={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default Tracklist;
