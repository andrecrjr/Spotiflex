import React from 'react';
import { ISpotifyAlbum } from '../../../types';
import Image from 'next/image';

const AlbumHeader: React.FC<{ album: ISpotifyAlbum }> = ({ album }) => {
  return (
    <section className='header__album--wrapper'>
      <div className='header__album--pic'>
        <Image src={album.images[0].url} layout='fill' />
      </div>
      <div className='header__album--name'>
        <h2 className='header__album--title'>{album.name}</h2>
        <div className='header__album--artist'>
          {album.artists.map((artist) => {
            return (
              <>
                <h2 key={artist.id}>{artist.name}</h2>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AlbumHeader;
