export interface ISpotifyPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [{ url: string; width?: number; height?: number }];
  name: string;
  owner: {
    display_name: string;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color?: string;
  public?: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: 'playlist';
  uri: string;
}

export interface ISpotifyAlbum {
  album_type: 'album';
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/6AgTAQt8XS6jRWi4sX7w49';
      };
      href: 'https://api.spotify.com/v1/artists/6AgTAQt8XS6jRWi4sX7w49';
      id: '6AgTAQt8XS6jRWi4sX7w49';
      name: 'Polo G';
      type: 'artist';
      uri: 'spotify:artist:6AgTAQt8XS6jRWi4sX7w49';
    }
  ];
  available_markets: [];
  external_urls: {
    spotify: 'https://open.spotify.com/album/7KSf6p0G0mZd7j60etVTwT';
  };
  href: 'https://api.spotify.com/v1/albums/7KSf6p0G0mZd7j60etVTwT';
  id: '7KSf6p0G0mZd7j60etVTwT';
  images: [
    {
      height: 640;
      url: 'https://i.scdn.co/image/ab67616d0000b273a493e05c99d8ec5e8020ff2b';
      width: 640;
    }
  ];
  name: 'Hall of Fame';
  release_date: '2021-06-11';
  release_date_precision: 'day';
  total_tracks: 20;
  type: 'album';
  uri: 'spotify:album:7KSf6p0G0mZd7j60etVTwT';
}
