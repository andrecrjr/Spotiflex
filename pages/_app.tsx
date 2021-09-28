import type { AppProps } from 'next/app';
import TransactionPage from '../components/TransactionPage';
import Layout from '../components/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <TransactionPage>
        <Component {...pageProps} />
      </TransactionPage>
    </Layout>
  );
}

export default MyApp;
