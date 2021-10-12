import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { ISearchSpotify } from '../../types/spotifyTypes';
import { getDataSpotify } from '../../components/services';
import Carousel from '../../components/Layout/List/Carousel';

const Search = ({ query }) => {
  const [autoComplete, setAutoComplete] = useState<ISearchSpotify>({});

  useEffect(() => {
    redirectSearch(query);
  }, [query]);
  const redirectSearch = async (query: string) => {
    const resp = await getDataSpotify<ISearchSpotify>(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=artist%2Ctrack%2Calbum&limit=20&offset=0`
    );
    setAutoComplete(resp);
  };
  console.log(autoComplete);
  return (
    <>
      {Object.keys(autoComplete).length > 0 && (
        <>
          {autoComplete.artists.items.length > 0 && (
            <Carousel
              listType={{ artists: autoComplete.artists.items }}
              iconsWithTitle={false}
            />
          )}
          {autoComplete.albums.items.length > 0 && (
            <Carousel
              listType={{ albums: autoComplete.albums.items }}
              iconsWithTitle={true}
            />
          )}
        </>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params: query,
}) => {
  try {
    return {
      props: query,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export default Search;
