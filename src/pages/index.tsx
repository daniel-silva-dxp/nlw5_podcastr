import { GetStaticProps } from "next";

import { api } from "../services/api";
import { Episode } from "../types/types";

type HomeProps = {
  episodes: Episode[];
};

export default function Home({ episodes }: HomeProps) {
  console.log(episodes);
  return <h1>Index</h1>;
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // 8 hours
  };
};
