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
  tracks: {
    href: string;
    items: [
      {
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
        type: 'track';
        uri: 'spotify:track:5fBCiTK3cN8RJb7AlfwXfB';
      },
      {
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
          },
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/3oSJ7TBVCWMDMiYjXNiCKE';
            };
            href: 'https://api.spotify.com/v1/artists/3oSJ7TBVCWMDMiYjXNiCKE';
            id: '3oSJ7TBVCWMDMiYjXNiCKE';
            name: 'Kane Brown';
            type: 'artist';
            uri: 'spotify:artist:3oSJ7TBVCWMDMiYjXNiCKE';
          }
        ];
        available_markets: string[];
        disc_number: 1;
        duration_ms: 166506;
        explicit: false;
        external_urls: {
          spotify: 'https://open.spotify.com/track/00KyYtT6NaXwbPecina5Pj';
        };
        href: 'https://api.spotify.com/v1/tracks/00KyYtT6NaXwbPecina5Pj';
        id: '00KyYtT6NaXwbPecina5Pj';
        is_local: false;
        name: 'Famous Friends';
        preview_url: 'https://p.scdn.co/mp3-preview/9227d1b24ce4ad3e1691ae72e365d3abe4c4655b?cid=774b29d4f13844c495f206cafdad9c86';
        track_number: 2;
        type: 'track';
        uri: 'spotify:track:00KyYtT6NaXwbPecina5Pj';
      }
    ];
  };
  type: 'album';
  uri: 'spotify:album:7KSf6p0G0mZd7j60etVTwT';
}
