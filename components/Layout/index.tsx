import React from 'react';
import Header from './Header';
import { TrackPlayerFooter } from './Tracklist/TrackPlayerFooter';

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <section className={`main--grid`}>
        <Header />
        <section className='main--wrapper'>
          <main className={`main--block`}>{children}</main>
        </section>
        <TrackPlayerFooter />
      </section>
    </>
  );
};

export default Layout;
