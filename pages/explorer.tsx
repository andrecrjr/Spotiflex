import React from 'react';
import { GetServerSideProps } from 'next';
import { getLatestAndGenres } from '@/components/services';
import SongList from '@/components/Layout/List';
import { ISpotifyAlbum, PlaylistItems } from '@/types/index';
import LayoutMetaSEO from '@/components/Layout/LayoutMetaSEO';

const Explorer: React.FC<{
  playlistsGenre?: PlaylistItems[];
  latestReleases?: ISpotifyAlbum[];
  featuredPlaylists?: ISpotifyAlbum[];
  isChild?: boolean;
}> = ({
  playlistsGenre,
  latestReleases,
  isChild = false,
  featuredPlaylists,
}) => {
  return (
    <>
      {!isChild && <LayoutMetaSEO title='Spotiflex Explorer' />}
      <section className='block' id='explorer'>
        <h1 className='block--title'>Explorer</h1>
        <SongList
          listType={{ albums: latestReleases }}
          name={'New Releases'}
          iconsWithTitle={false}
        />
        <SongList
          listType={{ albums: featuredPlaylists }}
          name={'Featured Playlists'}
          iconsWithTitle={true}
        />
        <SongList
          listType={{ playlists: playlistsGenre }}
          name={'Playlists by Genre'}
          iconsWithTitle={true}
        />
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    return await getLatestAndGenres();
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        statusCode: 301,
        destination: '/',
      },
    };
  }
};

export default Explorer;
