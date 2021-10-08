import React from 'react';
import LayoutMetaSEO from '../../components/Layout/LayoutMetaSEO';
import { GetServerSideProps } from 'next';

import { ISpotifyAlbum, ISpotifyPlaylist } from '../../types';

import TrackListWrapper from '../../components/Layout/Tracklist/wrapper';
import { getTrackListContent } from '../../components/services';

const Album: React.FC<{ album?: ISpotifyAlbum; playlist?: ISpotifyPlaylist }> =
  ({ album, playlist }) => {
    if (playlist) {
      return (
        <>
          <LayoutMetaSEO title={`${playlist.name} `} />
          <TrackListWrapper playlist={playlist} />
        </>
      );
    }
    return (
      <>
        <LayoutMetaSEO title={`${album.artists[0].name} - ${album.name}`} />
        <TrackListWrapper album={album} />
      </>
    );
  };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    return { props: { album: await getTrackListContent('albums', params.id) } };
  } catch (error) {
    return { notFound: true };
  }
};

export default Album;
