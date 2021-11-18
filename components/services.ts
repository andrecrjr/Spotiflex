import { PlaylistItems } from './../types/index.d';
import { ISpotifyAlbum } from './../types/spotifyTypes.d';
import { getPublicAuth } from '../helper';

export const getLatestAndGenres = async (): Promise<{
  props: { playlistsGenre: PlaylistItems[]; latestReleases: ISpotifyAlbum[] };
}> => {
  const auth = await getPublicAuth();
  const fetchPlaylists = await Promise.all([
    fetch('https://api.spotify.com/v1/browse/categories', {
      headers: {
        Authorization: `${auth.token_type} ${auth.access_token}`,
      },
    }),
    fetch('https://api.spotify.com/v1/browse/new-releases?offset=0&limit=20', {
      headers: {
        Authorization: `${auth.token_type} ${auth.access_token}`,
      },
    }),
  ]);

  const {
    categories: { items: playlistsGenre },
  } = await fetchPlaylists[0].json();
  const {
    albums: { items: latestReleases },
  } = await fetchPlaylists[1].json();

  return {
    props: { playlistsGenre, latestReleases },
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
    console.error(error);
  }
};

export const getTrackListContent = async (
  trackContent: 'albums' | 'playlists',
  id: string | string[]
): Promise<ISpotifyAlbum> => {
  try {
    const songContent: ISpotifyAlbum = await getDataSpotify(
      `${trackContent}/${id}`
    );
    return songContent;
  } catch (error) {
    console.error('Problem to get album');

    return null;
  }
};
