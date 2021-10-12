import React from 'react';
import { PlaylistItems, ISpotifyAlbum } from '../../../types';
import { IArtistSpotify } from '../../../types/spotifyTypes';

import Carousel from './Carousel';

const SongList: React.FC<{
  listType: {
    playlists?: PlaylistItems[];
    albums?: ISpotifyAlbum[];
    artists?: IArtistSpotify[];
  };
  name: string;
  iconsWithTitle: boolean;
}> = ({
  listType: { playlists = [], albums = [], artists = [] },
  name,
  iconsWithTitle,
}) => {
  return (
    <section className='block--horizontal-list'>
      <h1 className='block--title'>{name}</h1>
      <Carousel
        listType={{ playlists, slugName: 'playlists' }}
        iconsWithTitle={iconsWithTitle}
      />
      <Carousel
        listType={{ artists, slugName: 'artists' }}
        iconsWithTitle={iconsWithTitle}
      />
      <Carousel
        listType={{ albums, slugName: 'albums' }}
        iconsWithTitle={iconsWithTitle}
      />
    </section>
  );
};

export default SongList;
