import React from 'react';
import { ISpotifyAlbum } from '../../../types';
import Image from 'next/image';

const TrackListHeader: React.FC<{ album: ISpotifyAlbum }> = ({ album }) => {
  return (
    <section className='header__album--wrapper'>
      <div className='header__album--pic'>
        <Image src={album.images[0].url} layout='fill' alt={album.name} />
      </div>
      <div className='header__album--name'>
        <h2 className='header__album--title'>{album.name}</h2>
        <div className='header__album--artist'>
          {album.artists.map((artist, index, array) => {
            return (
              <>
                {artist.name}
                {index + 1 === array.length ? '' : ', '}
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrackListHeader;
