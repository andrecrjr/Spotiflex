import {
  ISpotifyAlbum,
  ISpotifyPlaylist,
  ISpotifyTopTrack,
} from '../../types/spotifyTypes';

export type IHookProps = {
  track: Track;
  isFooter: boolean;
};

export type IHookTracklistControlReturn = {
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
