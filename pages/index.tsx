import { GetServerSideProps } from "next";
import { getPublicAuth } from "../helper";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Herobanner from "../components/Herobanner";

import { PropsHome } from "../types";

export default function Home(props: PropsHome) {
  const router = useRouter();
  return (
    <Layout title='Main Page'>
      <Herobanner />
      <section className='block' id='main-box'>
        <h1 className='block--title'>Playlist from Genres:</h1>
        <ul className='block__pane'>
          {props.items?.map((item, index) => (
            <>
              <style jsx>
                {`
                  .block__pane--genre {
                    background: url(${item.icons[0].url});
                    background-repeat: no-repeat;
                    background-size: 150px 150px;
                  }
                `}
              </style>
              <li className='block__pane--space' key={index}>
                <div
                  className='block__pane--genre'
                  onClick={() => router.push(`/genre/${item.id}`)}
                >
                  <h4 className='block__pane--title'>{item.name}</h4>
                </div>
              </li>
            </>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await getPublicAuth(context.req.headers.host);
  const data = await fetch("https://api.spotify.com/v1/browse/categories", {
    headers: {
      Authorization: `${auth.token_type} ${auth.access_token}`,
    },
  });

  const {
    categories: { items },
  } = await data.json();

  return {
    props: { items },
  };
};
