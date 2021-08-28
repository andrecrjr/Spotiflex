import { getPublicAuth } from "../helper";

export const getLatestAndGenres = async () => {
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
}

export const getOnlyGenry = async(id:string|string[]) => {
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
}

export const getOnlyCategories = async () => {
	const auth = await getPublicAuth();
	const data = await fetch('https://api.spotify.com/v1/browse/categories', {
    headers: {
      Authorization: `${auth.token_type} ${auth.access_token}`,
    },
	});

	const { categories } = await data.json();
	return categories
}