import { createContext, ReactNode, useState } from "react";

type Episode = {
  id: string;
  title: string;
  members: string;
  description: string;
  published_at: string;
  thumbnail: string;
  file: {
    duration: number;
    durationAsString: string;
    url: string;
  };
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
};

type PlayerContextProps = {
  children: ReactNode;
};

export const PlayerContext = createContext({} as PlayerContextData);

function PlayerContextProvider({ children }: PlayerContextProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}>
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerContextProvider;
