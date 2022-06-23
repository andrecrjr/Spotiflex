import {
  ISpotifyAlbum,
  ISpotifyPlaylist,
  ISpotifyTopTrack,
} from './spotifyTypes.d';

type ItemsPlaylist = {
  primary_color: string;
  album: ISpotifyAlbum;
  video_thumbnail: [];
};

type ImageObject = {
  height: 64;
  url: string;
  width: 64;
};

export type typeOfTracklist =
  | 'album'
  | 'playlist'
  | 'single'
  | 'podcast'
  | 'track'
  | 'tracklist';

export type Track = {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: false;
  primary_color: null;
  album?: ISpotifyAlbum;
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  episode?: boolean;
  explicit?: boolean;
  href?: string;
  id?: string;
  is_local?: boolean;
  name?: string;
  popularity?: number;
  preview_url?: string;
  track?: Track;
  track_number?: number;
  type?: typeOfTrack;
  uri?: string;
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
};

interface PlaylistTracks {
  items: Track[];
  limit: 100;
  next: null;
  offset: 0;
  previous: null;
  total: 52;
}

export type ISpotifyPlaylistWrapper = {
  playlists: {
    href: string;
    items: ISpotifyPlaylist[];
  };
};

export interface ISpotifyPlaylist {
  collaborative: boolean;
  description?: string;
  external_urls?: {
    spotify: string;
  };
  href?: string;
  id?: string;
  images?: ImageObject[];
  name?: string;
  owner?: {
    display_name: string;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color?: string;
  public?: boolean;
  snapshot_id?: string;
  tracks: PlaylistTracks;
  type?: 'playlist' | 'tracklist';
  uri?: string;
}

export type ISpotifyAllTrackList =
  | ISpotifyAlbum
  | ISpotifyPlaylist
  | ISpotifyTopTrack;

export interface ISpotifyAlbum {
  album_type?: 'album';
  artists?: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  available_markets?: [];
  external_urls?: {
    spotify: string;
  };
  href?: string;
  id?: string;
  images?: ImageObject[];
  name?: string;
  release_date?: string;
  release_date_precision?: string;
  total_tracks?: 20;
  tracks: {
    href?: string;
    items: Track[];
    id?: '';
    added_at?: string;
  };
  type: string;
  uri?: string;
}

export interface ISpotifyArtist {
  external_urls?: string[];
  genres?: string[];
  href?: string;
  id: string;
  images: ImageObject[];
  name: string;
  popularity?: number;
  type: string;
  uri?: string;
}

export interface ISearchSpotify {
  albums?: {
    items: ISpotifyAlbum[];
  };
  artists?: {
    items: ISpotifyArtist[];
  };
  tracks?: {
    items: Track[];
  };
}

export interface ITracklist {
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/4BYxqVkZyFjtik7crYLg5Q';
      };
      href: 'https://api.spotify.com/v1/artists/4BYxqVkZyFjtik7crYLg5Q';
      id: '4BYxqVkZyFjtik7crYLg5Q';
      name: 'Chris Young';
      type: 'artist';
      uri: 'spotify:artist:4BYxqVkZyFjtik7crYLg5Q';
    }
  ];
  available_markets: string[];
  disc_number: 1;
  duration_ms: 177346;
  explicit: false;
  external_urls: {
    spotify: 'https://open.spotify.com/track/5fBCiTK3cN8RJb7AlfwXfB';
  };
  href: 'https://api.spotify.com/v1/tracks/5fBCiTK3cN8RJb7AlfwXfB';
  id: '5fBCiTK3cN8RJb7AlfwXfB';
  is_local: false;
  name: 'Raised on Country';
  preview_url: 'https://p.scdn.co/mp3-preview/b701335497d8bb45ea6b79e2d5a16c541789240c?cid=774b29d4f13844c495f206cafdad9c86';
  track_number: 1;
  items?: Track[];
  type: 'track';
  uri: 'spotify:track:5fBCiTK3cN8RJb7AlfwXfB';
}

type PropsGenre = {
  items: ISpotifyPlaylist[];
  title?: string;
};

export interface ISpotifyTopTrack {
  tracks: Track[];
  items?: [];
  type?: 'tracklist';
}
