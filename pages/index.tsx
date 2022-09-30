import Herobanner from '@/components/Herobanner';

import LayoutMetaSEO from '@/components/Layout/LayoutMetaSEO';

const Home: React.FC = () => {
  return (
    <>
      <LayoutMetaSEO title='Spotiflex - Just another client of spotify over world wide web!' />
      <Herobanner />
    </>
  );
};

export default Home;
