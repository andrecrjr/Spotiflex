import React from "react";
import { GetServerSideProps } from "next";

const Artist = (props) => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query);

  return { props: {} };
};

export default Artist;
