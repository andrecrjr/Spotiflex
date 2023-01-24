import React from 'react';
import Header from './Header';
import { TrackPlayerFooter } from './Tracklist/TrackPlayerFooter';
import Script from 'next/script';

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      {process.env.NODE_ENV !== 'development' && (
        <>
          <Script
            async
            src='https://www.googletagmanager.com/gtag/js?id=G-V00R8HQRD3'
            strategy='afterInteractive'
          ></Script>
          <Script id='google-analytics' strategy='afterInteractive'>
            {` window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-V00R8HQRD3');`}
          </Script>
        </>
      )}

      <main className={`main--grid`}>
        <Header />
        <section className='main--wrapper'>
          <section className={`main--block`}>{children}</section>
        </section>
        <TrackPlayerFooter />
      </main>
    </>
  );
};

export default Layout;
