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
      const trackList = playList || albumList;
      console.log(trackList);
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlSpace='preserve'
              viewBox='0 0 408.221 408.221'
            >
              <path d='M204.11 0C91.388 0 0 91.388 0 204.111c0 112.725 91.388 204.11 204.11 204.11 112.729 0 204.11-91.385 204.11-204.11C408.221 91.388 316.839 0 204.11 0zm-31.542 218.325-79.405 45.536c-13.683 7.835-24.778 1.419-24.778-14.351v-90.792c0-15.77 11.095-22.191 24.778-14.349l79.405 45.546c13.683 7.836 13.683 20.56 0 28.41zm151.62 29.086c0 15.761-8.672 28.549-19.355 28.549-10.688 0-19.344-12.788-19.344-28.549v-24.994l-72.27 41.444c-13.678 7.835-24.765 1.411-24.765-14.358v-90.784c0-15.77 11.087-22.191 24.765-14.349l72.27 41.449v-25.012c0-15.761 8.656-28.549 19.344-28.549 10.684 0 19.355 12.788 19.355 28.549v86.604z' />
            </svg>
          </span>
        )}
        <span
          className='player--control'
          data-control='play'
          onClick={playTrack}
        >
          <PlayPauseSongButton {...{ statusPlayer }} />
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlSpace='preserve'
              viewBox='0 0 408.221 408.221'
            >
              <path d='M204.11 0C91.388 0 0 91.388 0 204.111c0 112.725 91.388 204.11 204.11 204.11 112.729 0 204.11-91.385 204.11-204.11C408.221 91.388 316.839 0 204.11 0zm-31.542 218.325-79.405 45.536c-13.683 7.835-24.778 1.419-24.778-14.351v-90.792c0-15.77 11.095-22.191 24.778-14.349l79.405 45.546c13.683 7.836 13.683 20.56 0 28.41zm151.62 29.086c0 15.761-8.672 28.549-19.355 28.549-10.688 0-19.344-12.788-19.344-28.549v-24.994l-72.27 41.444c-13.678 7.835-24.765 1.411-24.765-14.358v-90.784c0-15.77 11.087-22.191 24.765-14.349l72.27 41.449v-25.012c0-15.761 8.656-28.549 19.344-28.549 10.684 0 19.355 12.788 19.355 28.549v86.604z' />
            </svg>
          </span>
        )}
        {isFooter && nowTrack && (
          <div className='track--footer__track-info'>
            <div className='track--footer__track-title'>
              <h3>{nowTrack.name}</h3>
            </div>
            <div>
              {nowTrack.album.artists.map((artist, index) => (
                <span className='track--footer__track-artist' key={artist.id}>
                  {artist.name}
                  {nowTrack.album.artists.length === index + 1 ? '' : ', '}
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
