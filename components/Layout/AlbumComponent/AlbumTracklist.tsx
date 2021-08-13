import React from 'react';
import { ISpotifyAlbum } from '../../../types';
import Tracklist from '../Tracklist';

export const AlbumTracklist: React.FC<{ album: ISpotifyAlbum }> = ({
  album,
}) => {
  return <div>{/* <Tracklist tracklist={album.tracks.items} /> */}</div>;
};
