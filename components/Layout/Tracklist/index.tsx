import React from 'react';
import { ISpotifyAlbum, ISpotifyPlaylist } from '../../../types';
import TrackListChild from './TrackListChild';

const Tracklist: React.FC<{
  albumList?: ISpotifyAlbum;
  playList?: ISpotifyPlaylist;
}> = ({ albumList, playList }) => {
  console.log(playList.tracks.items[0]);
  return (
    <ul className='tracklist__wrapper'>
      {playList?.tracks.items.map((item) => {
        return (
          <li className='tracklist__item' key={item.id}>
            <TrackListChild track={item} />
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
