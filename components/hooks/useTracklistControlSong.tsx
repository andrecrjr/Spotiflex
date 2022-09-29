import { Track } from '@/types/spotifyTypes';
import {
  useRef,
  useContext,
  useState,
  useCallback,
  useEffect,
  Dispatch,
} from 'react';
import { AlbumPlaylistContext, UserQueuePlaylist } from '../context';
import {
  ISpotifyAlbum,
  ISpotifyPlaylist,
  ISpotifyTopTrack,
} from '../../types/spotifyTypes';

type Props = {
  track: Track;
  isFooter: boolean;
};

type IHookTracklistControlReturn = {
  playTrack: (e: React.MouseEvent) => void;
  currentTrack: Track | null;
  dispatchPlaylist: Dispatch<{
    type: string;
    payload?: {
      track?: Track;
      playlist?: ISpotifyAlbum | ISpotifyPlaylist | ISpotifyTopTrack;
      type?: string;
    };
  }>;
  statusPlayer: boolean;
};

const useTracklistSongControl = ({
  track,
  isFooter,
}: Props): IHookTracklistControlReturn => {
  const audioSongElementPlayer = useRef<HTMLAudioElement | null>(null);
  const { dispatchPlaylist } = useContext(UserQueuePlaylist);
  const { albumList, playList, trackList } = useContext(AlbumPlaylistContext);
  const [statusPlayer, setStatus] = useState(false);
  const [currentTrack, setNowPlaying] = useState<Track | null>(null);

  const playSong = useCallback(
    async ({
      firstPlaySong,
      track,
    }: {
      firstPlaySong: boolean;
      track: Track;
    }) => {
      try {
        if (firstPlaySong) {
          audioSongElementPlayer.current = new Audio(track.preview_url);
        }
        await audioSongElementPlayer.current.play();
        setStatus(true);
        setNowPlaying(track);
        return 'play';
      } catch {
        dispatchPlaylist({
          type: 'NEXT_TRACK',
        });
        return 'next';
      }
    },
    [dispatchPlaylist]
  );

  useEffect(() => {
    if (isFooter && track) {
      playSong({ firstPlaySong: true, track });
    }
    return () => {
      isFooter && pauseSong() && setStatus(false);
    };
  }, [track, isFooter, playSong]);

  useEffect(() => {
    statusPlayer &&
      audioSongElementPlayer.current.addEventListener('ended', (e) => {
        e.preventDefault();
        dispatchPlaylist({
          type: 'NEXT_TRACK',
        });
      });
  }, [statusPlayer, dispatchPlaylist]);

  const pauseSong = () => {
    audioSongElementPlayer?.current.pause();
    return !!audioSongElementPlayer && true;
  };

  const playTrack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFooter) {
      if (audioSongElementPlayer.current !== null && statusPlayer) {
        pauseSong();
        setStatus(false);
      } else {
        playSong({ firstPlaySong: false, track });
      }
      return;
    }
    const trackPlayList = playList || albumList || trackList;
    dispatchPlaylist({
      type: 'ADD_PLAYLIST',
      payload: {
        track,
        playlist: trackPlayList,
        type: trackPlayList.type,
      },
    });
    return;
  };

  return { playTrack, currentTrack, dispatchPlaylist, statusPlayer };
};

export default useTracklistSongControl;
