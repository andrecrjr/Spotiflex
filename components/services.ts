import { PlaylistItems } from './../types/index.d';
import { ISpotifyAlbum, ISpotifyPlaylist } from './../types/spotifyTypes.d';
import { getPublicAuth } from '../utils/helper';

interface fetchData<T> {
  [data: string]: {
    items: T;
  };
}

export const getLatestAndGenres = async (): Promise<{
  props: {
    playlistsGenre: PlaylistItems[];
    latestReleases: ISpotifyAlbum[];
    featuredPlaylists: ISpotifyAlbum[];
  };
}> => {
  const [categoriesData, albumsData, playlistsData]: [
    playlistsGenre: fetchData<PlaylistItems[]>,
    latestReleases: fetchData<ISpotifyAlbum[]>,
    featuredPlaylists: fetchData<ISpotifyAlbum[]>
  ] = await Promise.all([
    getDataSpotify<fetchData<PlaylistItems[]>>('browse/categories'),
    getDataSpotify<fetchData<ISpotifyAlbum[]>>(
      'browse/new-releases?offset=0&limit=35'
    ),
    getDataSpotify<fetchData<ISpotifyAlbum[]>>(
      'browse/featured-playlists?offset=0&limit=45'
    ),
  ]);

  const {
    categories: { items: playlistsGenre },
  } = categoriesData;
  const {
    albums: { items: latestReleases },
  } = albumsData;
  const {
    playlists: { items: featuredPlaylists },
  } = playlistsData;
  return {
    props: { playlistsGenre, latestReleases, featuredPlaylists },
  };
};

export const getDataSpotify = async <T>(query: string): Promise<T> => {
  try {
    const auth = await getPublicAuth();

    const response = await fetch(`https://api.spotify.com/v1/${query}`, {
      headers: {
        Authorization: `${auth.token_type} ${auth.access_token}`,
      },
    });
    const body = await response.json();
    return body;
  } catch (error) {
    throw new Error(`Problem to get spotify data ${query}`);
  }
};

export const getTrackListContent = async (
  trackContent: 'albums' | 'playlists',
  id: string | string[]
): Promise<ISpotifyAlbum | ISpotifyPlaylist> => {
  try {
    const songContent: ISpotifyAlbum = await getDataSpotify(
      `${trackContent}/${id}`
    );
    return songContent;
  } catch (error) {
    console.error('Problem to get tracklist', error);
    return null;
  }
};
