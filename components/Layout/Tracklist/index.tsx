import React from 'react';
import { ISpotifyAlbum, ISpotifyPlaylist } from '../../../types';
import TrackListChild from './TrackListChild';
import { AlbumPlaylistContext, UserQueuePlaylist } from '../../context';
import { ISpotifyTopTrack, Track } from '../../../types/spotifyTypes';
import { useContext } from 'react';

const Tracklist: React.FC<{
  albumList?: ISpotifyAlbum;
  playList?: ISpotifyPlaylist;
  trackList?: ISpotifyTopTrack;
}> = ({ albumList, playList, trackList }) => {
  const { state } = useContext(UserQueuePlaylist);
  const isUserPlayingThisSongInQueue = (track: Track) =>
    (state.nowPlayTrack?.id === track.id && 'track-playing') || '';
  return (
    <AlbumPlaylistContext.Provider value={{ albumList, playList, trackList }}>
      <ul className='tracklist__wrapper'>
        {playList?.tracks?.items.map((item) => (
          <li
            className={`tracklist__item ${isUserPlayingThisSongInQueue(
              item.track
            )}`}
            id={item.track.id}
            key={item.track.id}
          >
            <TrackListChild track={item.track} />
          </li>
        ))}
        {albumList?.tracks?.items.map((item) => {
          return (
            <li
              className={`tracklist__item ${isUserPlayingThisSongInQueue(
                item
              )}`}
              id={item.id}
              key={item.id}
            >
              <TrackListChild track={item} />
            </li>
          );
        })}
        {trackList?.tracks?.map((item) => {
          return (
            <li
              className={`tracklist__item ${isUserPlayingThisSongInQueue(
                item
              )}`}
              id={item.id}
              key={item.id}
            >
              <TrackListChild track={item} />
            </li>
          );
        })}
      </ul>
    </AlbumPlaylistContext.Provider>
  );
};

export default Tracklist;
