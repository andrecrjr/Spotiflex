import React from 'react';
import { GetServerSideProps } from 'next';
import Album from '../album/[id]';
import { getTrackListContent } from '../../components/services';
import { ISpotifyPlaylist } from '../../types';

const Playlist: React.FC<{ playlist: ISpotifyPlaylist }> = ({ playlist }) => {
  console.log(playlist);
  return <Album playlist={playlist} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    console.log(params.id);
    if (params.id !== null) {
      const songContent = await getTrackListContent('playlists', params.id);

      return {
        props: { playlist: songContent },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      props: { playlist: [] },
    };
  }
};

export default Playlist;
