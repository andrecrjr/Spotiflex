import { PlaylistItems } from './../types/index.d';
import {
  ISpotifyAlbum,
  ISpotifyPlaylist,
  ISearchSpotify,
} from './../types/spotifyTypes.d';
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

export const getDataSpotify = async <T>(uri: string): Promise<T> => {
  const auth = await getPublicAuth(true);

  const response = await fetch(uri, {
    headers: {
      Authorization: `${auth.token_type} ${auth.access_token}`,
    },
  });

  const body = await response.json();

  return body;
};

export const getOnlyGenry = async (
  id: string | string[]
): Promise<ISpotifyPlaylist> => {
  const auth = await getPublicAuth();
  const data = await fetch(
    `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
    {
      headers: {
        Authorization: `${auth.token_type} ${auth.access_token}`,
      },
    }
  );
  const {
    playlists: { items },
  } = await data.json();

  return items;
};

export const getOnlyCategories = async (): Promise<{
  items: [{ href: string; id: string; icons: []; name: string }];
}> => {
  const auth = await getPublicAuth();
  const data = await fetch('https://api.spotify.com/v1/browse/categories', {
    headers: {
      Authorization: `${auth.token_type} ${auth.access_token}`,
    },
  });

  const { categories } = await data.json();
  return categories;
};

export const getTrackListContent = async (
  trackContent: 'albums' | 'playlists',
  id: string | string[]
): Promise<ISpotifyAlbum> => {
  try {
    const auth = await getPublicAuth();
    const data = await fetch(
      `https://api.spotify.com/v1/${trackContent}/${id}`,
      {
        headers: {
          Authorization: `${auth.token_type} ${auth.access_token}`,
        },
      }
    );
    const songContent: ISpotifyAlbum = await data.json();

    return songContent;
  } catch (error) {
    console.error('Problem to get album');

    return null;
  }
};
