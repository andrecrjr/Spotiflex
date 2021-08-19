import { GetStaticPaths, GetStaticProps } from 'next';
import { ISpotifyPlaylist } from '../../types/spotifyTypes';
import { getPublicAuth } from '../../helper';
import Layout from '../../components/Layout';

type PropsGenre = {
  items: ISpotifyPlaylist[];
  title?: string;
};

const Genre: React.FunctionComponent<PropsGenre> = ({ items, title }) => {
  return (
    <Layout title={title} subpage={true}>
      <h1 className='block__page--title'>{title}</h1>

      <ul className='block__page--wrapper'>
        {items &&
          items.map((item, index) => (
            <a href={item.href} key={index}>
              <style jsx>{`
                .block__page--section {
                  background: url(${item.images[0].url});
                  background-size: 150px 150px;
                }
              `}</style>
              <li className='block__page--section' key={item.id}></li>
            </a>
          ))}
      </ul>
    </Layout>
  );
};

export default Genre;

export const getStaticPaths: GetStaticPaths = async () => {
  const auth = await getPublicAuth();
  let paths = [{ params: { id: 'rock' } }];

  const data = await fetch('https://api.spotify.com/v1/browse/categories', {
    headers: {
      Authorization: `${auth.token_type} ${auth.access_token}`,
    },
  });
  const { categories } = await data.json();

  paths = categories?.items.map((genres) => ({
    params: { id: genres.id },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const auth = await getPublicAuth();
    const data = await fetch(
      `https://api.spotify.com/v1/browse/categories/${params.id}/playlists`,
      {
        headers: {
          Authorization: `${auth.token_type} ${auth.access_token}`,
        },
      }
    );
    const {
      playlists: { items },
    } = await data.json();

    return {
      props: { items: items, title: params.id },
      revalidate: 5,
    };
  } catch (error) {
    return { notFound: true };
  }
};
