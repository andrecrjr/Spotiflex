import Head from 'next/head';
import React from 'react';
import Header from './Header';

const Layout: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className='main--grid'>
        <Header />
        <section className='main--wrapper'>
          <main className='main--block'>{children}</main>
        </section>
      </section>
    </>
  );
};

export default Layout;
