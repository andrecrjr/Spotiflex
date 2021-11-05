import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { Track } from '../../../types/spotifyTypes';
import { AlbumPlaylistContext, UserQueuePlaylist } from '../../context';
import {
  CgPlayTrackNextO,
  CgPlayTrackPrevO,
  CgPlayButtonO,
  CgPlayPauseO,
} from 'react-icons/cg';

export const TrackPlayer: React.FC<{ track: Track; isFooter: boolean }> = ({
  track,
  isFooter = false,
}) => {
  const playerChild = useRef<HTMLAudioElement | null>(null);
  const { albumList, playList, trackList } = useContext(AlbumPlaylistContext);

  const { dispatchPlaylist } = useContext(UserQueuePlaylist);
  const [statusPlayer, setStatus] = useState(false);
  const [nowTrack, setNowPlaying] = useState<Track | null>(null);

  const playSong = useCallback(
    async (track) => {
      try {
        playerChild.current = new Audio(track.preview_url);
        await playerChild.current.play();
        setStatus(true);
        setNowPlaying(track);
      } catch {
        dispatchPlaylist({
          type: 'NEXT_TRACK',
        });
      }
    },
    [dispatchPlaylist]
  );

  useEffect(() => {
    if (isFooter && track) {
      playSong(track);
    }
    return () => {
      if (isFooter) {
        pauseSong();
        setStatus(false);
      }
    };
  }, [track, isFooter, playSong]);

  useEffect(() => {
    if (statusPlayer) {
      playerChild.current.addEventListener('ended', (e) => {
        e.preventDefault();
        dispatchPlaylist({
          type: 'NEXT_TRACK',
        });
      });
    }
  }, [statusPlayer, dispatchPlaylist]);

  const pauseSong = () => {
    playerChild?.current.pause();
  };

  const playTrack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFooter) {
      if (playerChild.current !== null && statusPlayer) {
        pauseSong();
        setStatus(false);
      } else {
        playSong(track);
      }
    } else {
      const trackPlayList = playList || albumList || trackList;
      dispatchPlaylist({
        type: 'ADD_PLAYLIST',
        payload: {
          track,
          playlist: trackPlayList,
          type: trackPlayList.type,
        },
      });
    }
  };

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
          >
            <CgPlayTrackNextO className={'player--control__icon'} />
          </span>
        )}
        {isFooter && nowTrack && (
          <div className='track--footer__track-info'>
            <div className='track--footer__track-title'>
              <h3>{nowTrack.name}</h3>
            </div>
            <div>
              {nowTrack.artists?.map((artist, index) => (
                <span className='track--footer__track-artist' key={artist.id}>
                  {artist.name}
                  {nowTrack.artists.length === index + 1 ? '' : ', '}
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
