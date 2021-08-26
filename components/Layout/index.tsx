import Head from 'next/head';
import React from 'react';
import Header from './Header';
import { useRouter } from 'next/router';

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <section className={`main--grid`}>
        <Header />
        <section className='main--wrapper'>
          <main
            className={`main--block${router.pathname !== '/' && '__subpage'}`}
          >
            {children}
          </main>
        </section>
      </section>
    </>
  );
};

export default Layout;
