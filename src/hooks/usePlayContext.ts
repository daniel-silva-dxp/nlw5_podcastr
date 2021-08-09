import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";

export const usePlayContext = () => useContext(PlayerContext);
