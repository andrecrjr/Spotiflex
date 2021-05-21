import Head from "next/head";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <h1>Spotiflex</h1>
      </header>
      <main className='main--block'>{children}</main>
    </>
  );
};

export default Layout;
