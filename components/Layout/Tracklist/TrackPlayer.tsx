import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { Track } from '../../../types/spotifyTypes';
import { AlbumPlaylistContext, UserQueuePlaylist } from '../../context';

export const TrackPlayer: React.FC<{ track: Track; isFooter: boolean }> = ({
  track,
  isFooter = false,
}) => {
  const playerChild = useRef<HTMLAudioElement | null>(null);
  const { albumList, playList } = useContext(AlbumPlaylistContext);

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
      playerChild.current.addEventListener('ended', () => {
        if (track)
          dispatchPlaylist({
            type: 'NEXT_TRACK',
          });
      });
    }
  }, [statusPlayer, dispatchPlaylist, track]);

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
      const trackList = playList || albumList;

      dispatchPlaylist({
        type: 'ADD_PLAYLIST',
        payload: {
          track,
          playlist: trackList,
          type: trackList.type,
        },
      });
    }
  };

  return (
    <>
      <section className='player--wrapper'>
        <span
          className='player--control'
          style={{ cursor: 'pointer' }}
          onClick={playTrack}
        >
          <PlayPauseSongButton {...{ statusPlayer }} />
        </span>
        {isFooter && (
          <button
            onClick={() => {
              dispatchPlaylist({
                type: 'NEXT_TRACK',
              });
            }}
          >
            Next
          </button>
        )}
        {isFooter && nowTrack && <h3>{nowTrack.name}</h3>}
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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 60 60'
          className='button--play'
        >
          <path d='M45.563 29.174l-22-15c-.307-.208-.703-.231-1.031-.058-.327.173-.532.513-.532.884v30c0 .371.205.711.533.884.146.078.307.116.467.116.197 0 .394-.059.563-.174l22-15c.273-.186.437-.495.437-.826s-.164-.64-.437-.826zM24 43.107V16.893L43.225 30 24 43.107z' />
          <path d='M30 0C13.458 0 0 13.458 0 30s13.458 30 30 30 30-13.458 30-30S46.542 0 30 0zm0 58C14.561 58 2 45.439 2 30S14.561 2 30 2s28 12.561 28 28-12.561 28-28 28z' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlSpace='preserve'
          viewBox='0 0 512 512'
          className='button--play'
        >
          <path d='M256 0C114.842 0 0 114.842 0 256s114.842 256 256 256 256-114.842 256-256S397.158 0 256 0zm0 465.455c-115.493 0-209.455-93.961-209.455-209.455S140.507 46.545 256 46.545 465.455 140.507 465.455 256 371.493 465.455 256 465.455z' />
          <path d='M318.061 139.636c-12.853 0-23.273 10.42-23.273 23.273v186.182c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273V162.909c-.001-12.853-10.421-23.273-23.273-23.273zM193.939 139.636c-12.853 0-23.273 10.42-23.273 23.273v186.182c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273V162.909c0-12.853-10.42-23.273-23.273-23.273z' />
        </svg>
      )}
    </>
  );
};
