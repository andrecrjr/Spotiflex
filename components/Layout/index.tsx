import Head from "next/head";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className='block'>{children}</section>
    </>
  );
};

export default Layout;
