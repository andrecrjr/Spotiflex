import React from 'react';
import Layout from '../../components/Layout';
import { GetServerSideProps } from 'next';
import { getPublicAuth } from '../../helper';
import { ISpotifyAlbum } from '../../types';

import TrackListHeader from '../../components/Layout/Tracklist/TrackListHeader';
import Tracklist from '../../components/Layout/Tracklist';
import TrackListWrapper from '../../components/Layout/Tracklist/wrapper';

const Album: React.FC<{ album: ISpotifyAlbum }> = ({ album }) => {
  return (
    <Layout title={album.name} subpage={true} hasSideMenu={false}>
      <TrackListWrapper album={album} />
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
