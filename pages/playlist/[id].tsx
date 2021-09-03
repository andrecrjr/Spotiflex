import React from 'react';
import { GetServerSideProps } from 'next';

function Playlist(props) {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: '' };
};

export default Playlist;
