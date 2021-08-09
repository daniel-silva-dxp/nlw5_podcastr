import { AppProps } from "next/app";

import PlayerContextProvider from "../contexts/PlayerContext";
import { Header } from "../components/Header";
import { Player } from "../components/Player";

import styles from "../styles/pages/app.module.scss";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
