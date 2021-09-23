import React from 'react';
import Header from './Header';
import { QueuePlaylistTrack } from './Tracklist/QueuePlaylistTrack';

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
        <QueuePlaylistTrack />
      </section>
    </>
  );
};

export default Layout;
