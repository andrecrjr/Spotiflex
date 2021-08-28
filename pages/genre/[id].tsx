import { GetStaticPaths, GetStaticProps } from 'next';
import { ISpotifyPlaylist } from '../../types/spotifyTypes';
import { getPublicAuth } from '../../helper';
import { GeneralAlbum } from '../../components/Layout/List/Playlist';
import LayoutMetaSEO from '../../components/Layout/LayoutMetaSEO';
import { getOnlyCategories, getOnlyGenry } from '../../components/services';

type PropsGenre = {
  items: ISpotifyPlaylist[];
  title?: string;
};

const Genre: React.FunctionComponent<PropsGenre> = ({ items, title }) => {
  return (
    <>
      <LayoutMetaSEO title={title} />
      {title && <h1 className='block__page--title'>{title}</h1>}
      <ul className='block__page--wrapper'>
        {items &&
          items.map((item) => (
            <section className='block__pane' key={item.id}>
              <GeneralAlbum album={item} />
            </section>
          ))}
      </ul>
    </>
  );
};

export default Genre;

export const getStaticPaths: GetStaticPaths = async () => {
  
  let paths = [{ params: { id: 'rock' } }];

	const categories = await getOnlyCategories();

  paths = categories?.items.map((genres) => ({
    params: { id: genres.id },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const items = await getOnlyGenry(params.id);
    return {
      props: { items: items, title: params.id },
      revalidate: 5,
    };
  } catch (error) {
    return { notFound: true };
  }
};
