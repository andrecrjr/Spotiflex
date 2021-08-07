import React from 'react';
import Layout from '../../components/Layout';
import { GetServerSideProps } from 'next';
import { getPublicAuth } from '../../helper';
import { ISpotifyAlbum } from '../../types';

import AlbumHeader from '../../components/Layout/AlbumComponent/AlbumHeader';

const Album: React.FC<{ album: ISpotifyAlbum }> = ({ album }) => {
  return (
    <Layout title={album.name} subpage={true}>
      <AlbumHeader album={album} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const auth = await getPublicAuth();
  const data = await fetch(`https://api.spotify.com/v1/albums/${params.id}`, {
    headers: {
      Authorization: `${auth.token_type} ${auth.access_token}`,
    },
  });
  const album = await data.json();
  return { props: { album } };
};

export default Album;
