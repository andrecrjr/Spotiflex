import React from 'react';
import { GetServerSideProps } from 'next';
import {
  getArtistOrBandContent,
  getTopArtistTrack,
} from '../../components/services';
import { ISpotifyArtist, ISpotifyTopTrack } from '../../types/spotifyTypes';
import ArtistPage from '../../components/Layout/ArtistList';
import LayoutMetaSEO from '../../components/Layout/LayoutMetaSEO';

const Artist: React.FC<{
  artistProfile: ISpotifyArtist;
  artistTopTrack: ISpotifyTopTrack;
}> = ({ artistProfile, artistTopTrack }) => {
  return (
    <>
      <LayoutMetaSEO title={artistProfile.name} />
      <ArtistPage profile={artistProfile} topTracks={artistTopTrack} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const artistProfile = await getArtistOrBandContent(params?.id);
    const artistTopTrack = await getTopArtistTrack(params?.id);
    return { props: { artistProfile, artistTopTrack } };
  } catch (error) {}
};

export default Artist;
