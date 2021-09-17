import React from 'react';
import { ISpotifyAlbum, ISpotifyPlaylist } from '../../../types';
import TrackListChild from './TrackListChild';

const Tracklist: React.FC<{
  albumList?: ISpotifyAlbum;
  playList?: ISpotifyPlaylist;
}> = ({ albumList, playList }) => {
  return (
    <ul className='tracklist__wrapper'>
      {playList?.tracks.items.map((item) => {
        return (
          <li className='tracklist__item' key={item.track.id}>
            <TrackListChild playlist={item} isPlaylist={true} />
          </li>
        );
      })}
      {albumList?.tracks.items.map((item) => {
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
