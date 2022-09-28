import { GetStaticPaths, GetStaticProps } from 'next';
import { PropsGenre, ISpotifyPlaylistWrapper } from '../../types/spotifyTypes';
import { GenericAlbumContent } from '../../components/Layout/List/Playlist';
import LayoutMetaSEO from '../../components/Layout/LayoutMetaSEO';
import { getDataSpotify } from '../../components/services';

const Genre: React.FunctionComponent<PropsGenre> = ({ items, title }) => {
  return (
    <>
      <LayoutMetaSEO title={title} />
      {title && (
        <h1 className='block__page--title'>{title.replace(/\-|\_/g, ' ')}</h1>
      )}
      <ul className='block__page--wrapper'>
        {items &&
          items.map((item, index) => (
            <div className='block__pane' key={index}>
              <GenericAlbumContent album={item} />
            </div>
          ))}
      </ul>
    </>
  );
};

export default Genre;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [{ params: { id: 'rock' } }];

  const { categories } = await getDataSpotify<{
    categories: {
      items: [{ href: string; id: string; icons: []; name: string }];
    };
  }>('browse/categories?offset=0&limit=20');
  paths = categories.items.map((genres) => ({
    params: { id: genres.id },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const data = await getDataSpotify<ISpotifyPlaylistWrapper>(
      `browse/categories/${params.id}/playlists`
    );
    return {
      props: { items: data?.playlists?.items || [], title: params.id },
      revalidate: 5,
    };
  } catch (error) {
    return { notFound: true };
  }
};
