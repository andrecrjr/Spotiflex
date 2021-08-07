import React from 'react';
import Layout from '../../components/Layout';
import { GetServerSideProps } from 'next';
import { getPublicAuth } from '../../helper';
import { ISpotifyAlbum } from '../../types';

const Album: React.FC<{ album: ISpotifyAlbum }> = ({ album }) => {
  return (
    <Layout title={album.name}>
      <section className='header__album'>
        <div>
          <img src={album.images[0].url} />
        </div>
        <div>
          <h1>{album.name}</h1>
        </div>
      </section>
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
  console.log(album);
  return { props: { album } };
};

export default Album;
