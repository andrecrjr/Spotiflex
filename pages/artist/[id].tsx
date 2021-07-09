import React from 'react';
import { GetServerSideProps } from 'next';

const Artist: React.FC = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default Artist;
