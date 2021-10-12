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
}> = ({ listType: { playlists = [], albums = [], artists = [] }, name }) => {
  return (
    <section className='block--horizontal-list'>
      <h1 className='block--title'>{name}</h1>
      <Carousel
        listType={{ playlists, slugName: 'top' }}
        iconsWithTitle={true}
      />
      <Carousel
        listType={{ artists, slugName: 'latestAlbums' }}
        iconsWithTitle={false}
      />
      <Carousel
        listType={{ albums, slugName: 'latestAlbums' }}
        iconsWithTitle={false}
      />
    </section>
  );
};

export default SongList;
