import React from 'react';
import { ISpotifyAlbum, ISpotifyPlaylist } from '../../../types';
import TrackListChild from './TrackListChild';
import { AlbumPlaylistContext } from '../../context';

const Tracklist: React.FC<{
  albumList?: ISpotifyAlbum;
  playList?: ISpotifyPlaylist;
}> = ({ albumList, playList }) => {
  return (
    <AlbumPlaylistContext.Provider value={{ albumList, playList }}>
      <ul className='tracklist__wrapper'>
        {playList?.tracks.items.map((item) => {
          return (
            <li className='tracklist__item' key={item.track.id}>
              <TrackListChild track={item.track} />
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
    </AlbumPlaylistContext.Provider>
  );
};

export default Tracklist;
