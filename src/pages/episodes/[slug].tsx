import { GetStaticPaths, GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { Episode as EpisodeType } from "../../types/types";

type EpisodeProps = {
  episode: EpisodeType;
};

export default function Episode({ episode }: EpisodeProps) {
  return (
    <div>
      <h1>Episode</h1>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    description: data.description,
    thumbnail: data.thumbnail,
    published_at: format(parseISO(data.published_at), "dd MMM yy", {
      locale: ptBR,
    }),
    file: {
      duration: Number(data.file.duration),
      durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      url: data.file.url,
    },
  };

  return {
    props: { episode },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
