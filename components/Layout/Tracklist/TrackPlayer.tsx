import React from 'react';
import { Track } from '../../../types/spotifyTypes';

import {
  CgPlayTrackNextO,
  CgPlayTrackPrevO,
  CgPlayButtonO,
  CgPlayPauseO,
} from 'react-icons/cg';

import useTracklistSongControl from '@/components/hooks/useTracklistControlSong';

export const TrackPlayer: React.FC<{ track: Track; isFooter: boolean }> = ({
  track,
  isFooter = false,
}) => {
  const { playTrack, currentTrack, statusPlayer, dispatchPlaylist } =
    useTracklistSongControl({ track, isFooter });

  return (
    <>
      <section className='player--wrapper'>
        {isFooter && (
          <span
            onClick={() => {
              dispatchPlaylist({
                type: 'PREVIOUS_TRACK',
              });
            }}
            className='player--control'
            data-control='previous'
          >
            <CgPlayTrackPrevO className={'player--control__icon'} />
          </span>
        )}

        <span
          className='player--control'
          data-control='play'
          onClick={playTrack}
          role='button'
        >
          {track.preview_url !== null && (
            <PlayPauseSongButton {...{ statusPlayer }} />
          )}
        </span>

        {isFooter && (
          <span
            onClick={() => {
              dispatchPlaylist({
                type: 'NEXT_TRACK',
              });
            }}
            className='player--control'
            data-control='next'
            role='button'
          >
            <CgPlayTrackNextO className={'player--control__icon'} />
          </span>
        )}
        {isFooter && (
          <div className='track--footer__track-info'>
            <div className='track--footer__track-title'>
              <h3 className='track--footer__title'>
                {currentTrack && currentTrack.name}
              </h3>
            </div>
            <div>
              {currentTrack &&
                currentTrack.artists?.map((artist, index) => (
                  <span className='track--footer__track-artist' key={artist.id}>
                    {artist.name}{' '}
                    {currentTrack.artists.length === index + 1 ? '' : ', '}
                  </span>
                ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export const PlayPauseSongButton: React.FC<{ statusPlayer: boolean }> = ({
  statusPlayer,
}) => {
  return (
    <>
      {!statusPlayer ? (
        <CgPlayButtonO className='button--play' />
      ) : (
        <CgPlayPauseO className='button--play' />
      )}
    </>
  );
};
