import Herobanner from '@/components/Herobanner';

import LayoutMetaSEO from '@/components/Layout/LayoutMetaSEO';

const Home: React.FC = () => {
  return (
    <>
      <LayoutMetaSEO title='Spotiflex - Just an unnoficial Spotify for my portfolio!' />
      <Herobanner />
    </>
  );
};

export default Home;
