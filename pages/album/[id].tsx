import React from 'react';
import LayoutMetaSEO from '../../components/Layout/LayoutMetaSEO';
import { GetServerSideProps } from 'next';
import { getPublicAuth } from '../../helper';
import { ISpotifyAlbum } from '../../types';

import TrackListWrapper from '../../components/Layout/Tracklist/wrapper';

const Album: React.FC<{ album: ISpotifyAlbum }> = ({ album }) => {
  return (
    <>
      <LayoutMetaSEO title={`${album.artists[0].name} - ${album.name}`} />
      <TrackListWrapper album={album} />
    </>
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
