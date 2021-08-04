import { GetStaticProps } from "next";

import { Episode } from "../types/types";

type HomeProps = {
  episodes: Array<Episode>;
};

export default function Home({ episodes }: HomeProps) {
  console.log(episodes);
  return <h1>Index</h1>;
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // 8 hours
  };
};
