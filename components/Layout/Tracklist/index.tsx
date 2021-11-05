import React from 'react';
import { ISpotifyAlbum, ISpotifyPlaylist } from '../../../types';
import TrackListChild from './TrackListChild';
import { AlbumPlaylistContext } from '../../context';
import { ISpotifyTopTrack } from '../../../types/spotifyTypes';

const Tracklist: React.FC<{
  albumList?: ISpotifyAlbum;
  playList?: ISpotifyPlaylist;
  trackList?: ISpotifyTopTrack;
}> = ({ albumList, playList, trackList }) => {
  return (
    <AlbumPlaylistContext.Provider value={{ albumList, playList, trackList }}>
      <ul className='tracklist__wrapper'>
        {playList?.tracks?.items.map((item) => (
          <li
            className='tracklist__item'
            id={item.track.id}
            key={item.track.id}
          >
            <TrackListChild track={item.track} />
          </li>
        ))}
        {albumList?.tracks?.items.map((item) => {
          return (
            <li className='tracklist__item' id={item.id} key={item.id}>
              <TrackListChild track={item} />
            </li>
          );
        })}
        {trackList?.tracks?.map((item) => {
          return (
            <li className='tracklist__item' id={item.id} key={item.id}>
              <TrackListChild track={item} />
            </li>
          );
        })}
      </ul>
    </AlbumPlaylistContext.Provider>
  );
};

export default Tracklist;
