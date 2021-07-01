import Head from "next/head";
import Header from "./Menu";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className='main--grid'>
        <Header />
        <main className='main--block'>{children}</main>
      </section>
    </>
  );
};

export default Layout;
