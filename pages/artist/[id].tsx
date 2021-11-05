import React from 'react';
import { GetServerSideProps } from 'next';
import { getDataSpotify } from '../../components/services';
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
    const artistProfile = await getDataSpotify<ISpotifyArtist>(
      `artists/${params.id}`
    );
    const artistTopTrackList = await getDataSpotify<ISpotifyTopTrack>(
      `artists/${params.id}/top-tracks?market=${'us'}`
    );
    const artistTopTrack = {
      ...{ type: 'tracklist' },
      ...artistTopTrackList,
    };
    return { props: { artistProfile, artistTopTrack } };
  } catch (error) {}
};

export default Artist;
