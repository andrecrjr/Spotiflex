import React from 'react';
import { ISpotifyAlbum } from '../../../types';
import Tracklist from '../Tracklist';

interface Props {}

export const AlbumTracklist: React.FC<{ album: ISpotifyAlbum }> = ({
  album,
}) => {
  return (
    <div>
      <Tracklist tracklist={album.tracks.items} />
    </div>
  );
};
