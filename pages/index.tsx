import { GetServerSideProps } from "next";
import { getPublicAuth } from "../helper";
import Layout from "../components/Layout";

import { PropsHome } from "../types";

export default function Home(props: PropsHome) {
  return (
    <Layout title='Main Page'>
      <section className='block'>
        <h1 className='block--title'>Genres</h1>
        <ul className='block__pane'>
          {props.items?.map((item, index) => (
            <li className='block__pane--genre' key={index}>
              <a href=''>
                <h4 className='block__pane--title'>{item.name}</h4>
                <img src={item.icons[0].url} className='block__pane--image' />
              </a>
            </li>
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
