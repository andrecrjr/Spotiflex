import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { ISearchSpotify } from '../../types/spotifyTypes';
import { getDataSpotify } from '../../components/services';
import Carousel from '../../components/Layout/List/Carousel';
import SongList from '../../components/Layout/List';

const Search: React.FC<{ resp: ISearchSpotify; query: string; notFound }> = ({
  resp,
  query,
}) => {
  const [autoComplete, setAutoComplete] = useState<ISearchSpotify>({});

  useEffect(() => {
    redirectSearch();
  }, [resp]);
  const redirectSearch = () => {
    setAutoComplete(resp);
  };
  if (query.length > 0)
    return (
      <div className='block' id='explorer'>
        {Object.keys(autoComplete).length > 0 && (
          <>
            {autoComplete.artists.items.length > 0 && (
              <SongList
                listType={{ artists: autoComplete.artists.items }}
                iconsWithTitle={true}
                name={`Artists found with "${query}"`}
              />
            )}
            {autoComplete.albums.items.length > 0 && (
              <SongList
                listType={{ albums: autoComplete.albums.items }}
                iconsWithTitle={true}
                name={`Albums found with "${query}"`}
              />
            )}
          </>
        )}
      </div>
    );
  return (
    <p>No searchings, please search your favorite song, album or artist!</p>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    let newQuery = params.query as string;
    const resp = await getDataSpotify<ISearchSpotify>(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        newQuery
      )}&type=artist%2Ctrack%2Calbum&limit=20&offset=0`,
      false
    );
    return {
      props: { resp, query: newQuery },
    };
  } catch (e) {
    return { notFound: true, newQuery: '' };
  }
};

export default Search;
