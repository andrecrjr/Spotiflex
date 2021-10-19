import Herobanner from '../components/Herobanner';

import LayoutMetaSEO from '../components/Layout/LayoutMetaSEO';

const Home: React.FC = () => {
  return (
    <>
      <LayoutMetaSEO title='Spotiflex - The web coolest client ever' />
      <Herobanner />
    </>
  );
};

export default Home;
