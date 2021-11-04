import React from 'react';
import { ISpotifyArtist, ISpotifyTopTrack } from '../../../types/spotifyTypes';
import Carousel from '../List/Carousel';
import Tracklist from '../Tracklist';
import TrackListHeader from '../Tracklist/TrackListHeader';
import TrackListWrapper from '../Tracklist/wrapper';
interface Props {}

const ArtistPage: React.FC<{
  profile: ISpotifyArtist;
  topTracks: ISpotifyTopTrack;
}> = ({ profile, topTracks }) => {
  console.log(profile);
  console.log(topTracks);
  return (
    <>
      <TrackListHeader artist={profile} />
      <div>
        <h1>Top Artist Track:</h1>
        <Tracklist trackSongs={topTracks} />
      </div>
    </>
  );
};

export default ArtistPage;
