import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { api } from "../services/api";
import { Episode } from "../types/types";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

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

  const episodes = data.map((episode: Episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      description: episode.description,
      thumbnail: episode.thumbnail,
      published_at: format(parseISO(episode.published_at), "dd MMM yy", {
        locale: ptBR,
      }),
      file: {
        duration: Number(episode.file.duration),
        durationAsString: convertDurationToTimeString(
          Number(episode.file.duration)
        ),
        url: episode.file.url,
      },
    };
  });

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8, // 8 hours
  };
};
