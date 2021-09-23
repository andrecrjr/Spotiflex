import type { AppProps } from 'next/app';
import TransactionPage from '../components/TransactionPage';
import Layout from '../components/Layout';
import '../styles/globals.scss';
import { UserPlaylistWrapper } from '../components/contextWrappers/UserPlaylist';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserPlaylistWrapper>
      <Layout>
        <TransactionPage>
          <Component {...pageProps} />
        </TransactionPage>
      </Layout>
    </UserPlaylistWrapper>
  );
}

export default MyApp;
