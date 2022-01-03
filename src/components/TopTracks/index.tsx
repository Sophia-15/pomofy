import React, { useEffect, useState } from 'react';
import { useSpotify } from '../../hooks/useSpotify';

import styles from './styles.module.scss';

export function TopTracks() {
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);

  const spotifyAPI = useSpotify();

  useEffect(() => {
    async function getTopTracks() {
      if (spotifyAPI.getAccessToken()) {
        const { body } = await spotifyAPI.getMyTopTracks();
        setTopTracks(body.items);
      }
    }

    getTopTracks();
  }, []);

  return (
    <section className={styles.topTracksSection}>
      <h2>Mais Escutadas</h2>

      <div className={styles.topTracksContent}>
        { topTracks.map((track) => {
          console.log(track.name);
          return (
            (
              <div className={styles.topTrack}>
                <span>1</span>
                <div>
                  <p>{track.name}</p>
                  <span>{track.artists[0]}</span>
                </div>
              </div>
            )
          );
        })}

      </div>
    </section>
  );
}
