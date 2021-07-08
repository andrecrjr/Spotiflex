import Head from "next/head";
import React, { ReactChildren } from "react";
import Header from "./Menu";

const Layout = ({ title, children }) => {
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
