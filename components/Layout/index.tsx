import React from 'react';
import Header from './Header';
import { TrackPlayerFooter } from './Tracklist/TrackPlayerFooter';

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
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
