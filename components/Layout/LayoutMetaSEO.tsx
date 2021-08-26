import Head from 'next/head';
import React from 'react';

const LayoutMetaSEO: React.FC<{
  title?: string;
}> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
};

export default LayoutMetaSEO;
