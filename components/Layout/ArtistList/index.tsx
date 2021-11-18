import React from 'react';
import { ISpotifyArtist, ISpotifyTopTrack } from '../../../types/spotifyTypes';
import Tracklist from '../Tracklist';
import TrackListHeader from '../Tracklist/TrackListHeader';

const ArtistPage: React.FC<{
  profile: ISpotifyArtist;
  topTracks: ISpotifyTopTrack;
}> = ({ profile, topTracks }) => {
  return (
    <>
      <TrackListHeader artist={profile} />
      <div className='tracklist--list'>
        <h1 className='tracklist--title'>Top songs</h1>
        <Tracklist trackList={topTracks} />
      </div>
    </>
  );
};

export default ArtistPage;
