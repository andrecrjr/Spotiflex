import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getPublicAuth } from "../helper";
import Layout from "../components/Layout";

import { PropsHome } from "../types";

export default function Home(props: PropsHome) {
  return (
    <Layout title='Main Page'>
      <section>
        <h1>Genres!</h1>
        <ul className=''>
          {props.items.map((item, index) => (
            <li className='block__pane--genre' key={index}>
              <section className='block__pane--title'>
                <p>{item.name}</p>
                <img src={item.icons[0].url} className='block__pane--image' />
              </section>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await getPublicAuth();
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
