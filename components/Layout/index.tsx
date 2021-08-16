import Head from 'next/head';
import React from 'react';
import Header from './Header';

const Layout: React.FC<{
  title: string;
  children: React.ReactNode;
  subpage?: boolean;
  hasSideMenu?: boolean;
}> = ({ title, children, subpage = false, hasSideMenu = true }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className={`main--grid`}>
        <Header hasMenu={hasSideMenu} />
        <section className='main--wrapper'>
          <main className={`main--block${(subpage && '__subpage') || ''}`}>
            {children}
          </main>
        </section>
      </section>
    </>
  );
};

export default Layout;
