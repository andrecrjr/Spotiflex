import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { ISearchSpotify } from '../../types/spotifyTypes';
import { getDataSpotify } from '../../components/services';
import SongList from '../../components/Layout/List';
import LayoutMetaSEO from '../../components/Layout/LayoutMetaSEO';

const Search: React.FC<{ resp: ISearchSpotify; query: string; notFound }> = ({
  resp,
  query,
}) => {
  const [autoComplete, setAutoComplete] = useState<ISearchSpotify>({});

  const redirectSearch = (resp) => {
    setAutoComplete(resp);
  };

  useEffect(() => {
    redirectSearch(resp);
  }, [resp]);

  if (query.length > 0)
    return (
      <>
        <LayoutMetaSEO title={`Searching by ${query}`} />
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
      </>
    );
  return (
    <p>No searchings, please search your favorite song, album or artist!</p>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const newQuery = params.query as string;
    const resp = await getDataSpotify<ISearchSpotify>(
      `search?q=${encodeURIComponent(
        newQuery
      )}&type=artist%2Ctrack%2Calbum&limit=20&offset=0`
    );
    return {
      props: { resp, query: newQuery },
    };
  } catch (e) {
    return { notFound: true, newQuery: '' };
  }
};

export default Search;
