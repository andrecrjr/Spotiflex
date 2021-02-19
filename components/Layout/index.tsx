import Head from "next/head";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className='main--block'>{children}</main>
    </>
  );
};

export default Layout;
