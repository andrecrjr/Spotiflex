import React from 'react';
import {
  ISpotifyAlbum,
  ISpotifyArtist,
  ISpotifyPlaylist,
} from '../../../types';
import Image from 'next/image';

const TrackListHeader: React.FC<{
  album?: ISpotifyAlbum;
  playlist?: ISpotifyPlaylist;
  artist?: ISpotifyArtist;
}> = ({ album, playlist, artist }) => {
  if (playlist) {
    return (
      <section className='header__album--wrapper'>
        <div className='header__album--pic'>
          {playlist?.images?.length > 0 || album?.images?.length > 0 ? (
            <Image
              src={playlist.images[0].url}
              layout='fill'
              alt={playlist.name}
            />
          ) : null}
        </div>
        <div className='header__album--meta'>
          <h2 className='header__album--title'>
            {playlist.name}
            {playlist.public ? (
              <span style={{ fontSize: '0.8rem' }} title='public playlist'>
                🔓
              </span>
            ) : (
              <span style={{ fontSize: '0.8rem' }} title='private playlist'>
                🔐
              </span>
            )}
          </h2>
          <p>{playlist.description}</p>
        </div>
      </section>
    );
  }

  if (artist) {
    return (
      <section className='header__album--wrapper'>
        <div className='header__album--pic'>
          {artist?.images?.length > 0 || album?.images?.length > 0 ? (
            <Image src={artist.images[0].url} layout='fill' alt={artist.name} />
          ) : null}
        </div>
        <div className='header__album--meta'>
          <h2 className='header__album--title'>{artist.name}</h2>
          <p>
            {artist.genres.map(
              (item, index, array) =>
                `${item}${index + 1 === array.length ? '' : ', '} `
            )}
          </p>
        </div>
      </section>
    );
  }

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
              <div style={{display:"contents"}} key={artist.name}>
                {artist.name}
                {index + 1 === array.length ? '' : ', '}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrackListHeader;
