import { GetStaticPaths, GetStaticProps } from "next";
import { ISpotifyPlaylist } from "../../types/spotifyTypes";
import { getPublicAuth } from "../../helper";
import Layout from "../../components/Layout";

interface PropsGenre {
  items: ISpotifyPlaylist[];
  title?: string;
}

function Genre({ items, title }: PropsGenre, loading) {
  console.log(loading);
  return (
    <Layout title={title}>
      <div className=''>
        <h1>{title}</h1>

        <ul className='block__wrapper'>
          {items &&
            items.map((item) => (
              <a href={item.href}>
                <style jsx>{`
                  .block__genre--section {
                    background: url(${item.images[0].url});
                    background-size: 150px 150px;
                  }
                `}</style>
                <li className='block__genre--section' key={item.id}></li>
              </a>
            ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Genre;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const auth = await getPublicAuth(process.env.SERVER_URL);
  let paths = [{ params: { id: "rock" } }];

  const data = await fetch("https://api.spotify.com/v1/browse/categories", {
    headers: {
      Authorization: `${auth.token_type} ${auth.access_token}`,
    },
  });
  const { categories: items } = await data.json();

  paths = items.items.map((genres) => ({ params: { id: genres.id } }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const auth = await getPublicAuth(process.env.SERVER_URL);

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

  console.log(items);
  return {
    props: { items, title: params.id },
    revalidate: 5,
  };
};
