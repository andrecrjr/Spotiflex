import { GetServerSideProps } from 'next';
import Herobanner from '../components/Herobanner';

import { ISpotifyAlbum, PlaylistItems } from '../types';
import LayoutMetaSEO from '../components/Layout/LayoutMetaSEO';
import Explorer from './explorer';
import { getLatestAndGenres } from '../components/services';

const Home: React.FC<{
  playlistsGenre?: PlaylistItems[];
  latestReleases?: ISpotifyAlbum[];
}> = ({ playlistsGenre, latestReleases }) => {
  return (
    <>
      <LayoutMetaSEO title='Spotiflex - The web coolest client ever' />
      <Herobanner />
			<Explorer isChild={true}
				playlistsGenre={playlistsGenre}
				latestReleases={latestReleases} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return await getLatestAndGenres()
};

export default Home;
