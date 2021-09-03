import React from 'react';
import { GetServerSideProps } from 'next';
import Album from '../album/[id]';
import { getTrackListContent } from '../../components/services';

function Playlist({ playlist }) {
  return <Album playlist={playlist} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    return {
      props: { playlist: await getTrackListContent('playlists', params.id) },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Playlist;
