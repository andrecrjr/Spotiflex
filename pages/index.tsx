import { GetServerSideProps } from 'next';
import { getPublicAuth } from '../helper';
import Layout from '../components/Layout';
import SongList from '../components/Layout/List';
import Herobanner from '../components/Herobanner';

import { ISpotifyAlbum, PlaylistItems } from '../types';

const Home: React.FC<{
  playlistsGenre?: PlaylistItems[];
  latestReleases?: ISpotifyAlbum[];
}> = ({ playlistsGenre, latestReleases }) => {
  return (
    <Layout title='Main Page'>
      <Herobanner />
      <section className='block' id='main-box'>
        <SongList
          listType={{ playlists: playlistsGenre }}
          name={'Genre Playlist'}
          iconsWithTitle={true}
        />
        <SongList
          listType={{ albums: latestReleases }}
          name={'Latest Users'}
          iconsWithTitle={false}
        />
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await getPublicAuth(context.req.headers.host);
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

export default Home;
