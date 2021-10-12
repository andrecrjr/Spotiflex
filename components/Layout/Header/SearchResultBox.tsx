import React from 'react';
import {
  ISpotifyAlbum,
  IArtistSpotify,
  Track,
} from '../../../types/spotifyTypes';
import Image from 'next/image';
import { relative } from 'path';

interface Props {}

export const SearchResultBox = ({
  searchName,
  type,
}: {
  searchName?: ISpotifyAlbum[] | Track[] | IArtistSpotify[];
  type?: string;
}) => {
  return (
    <div className='search--results-box'>
      <details open={true}>
        <summary>{type}</summary>
        <div className='search--results-child'>
          {searchName?.map((item) => (
            <section key={item.id} className='search--result'>
              <div
                style={{ position: 'relative', width: '60px', height: '60px' }}
              >
                {item.images.length > 0 && (
                  <Image
                    src={item.images[0].url}
                    layout='fill'
                    alt={item.name}
                  />
                )}
              </div>
              <p style={{ fontSize: '16px', width: '60%', overflow: 'hidden' }}>
                {item.name}
              </p>
            </section>
          ))}
        </div>
      </details>
    </div>
  );
};
