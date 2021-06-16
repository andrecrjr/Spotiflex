import Head from "next/head";
import Header from "./Menu";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className='main--block'>{children}</main>
    </>
  );
};

export default Layout;
