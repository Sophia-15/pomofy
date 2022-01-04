import React, { useEffect, useState } from 'react';
import { useSpotify } from '../../hooks/useSpotify';

import styles from './styles.module.scss';

type Track = {
  artists: string;
  name: string;
  track_number: number;
  songUrl: string;
}

interface ApiResponseProps {
  artists: [
    {
      name: string;
    }
  ]
  name: string;
  track_number: number;
  external_urls: {
    spotify: string;
  }
}

export function TopTracks() {
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  const spotifyAPI = useSpotify();

  useEffect(() => {
    async function getTopTracks() {
      if (spotifyAPI.getAccessToken()) {
        const { items } = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=10`, {
          headers: {
            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`
          }
        }).then(data => data.json());
        const trackInfo = items.map((track: ApiResponseProps) => {
          return {
            name: track.name,
            artists: track.artists.map((artist) => artist.name).join(', '),
            songUrl: track.external_urls.spotify,
          }
        })
        console.log(items)
        setTopTracks(trackInfo)
      }
    }

    setTimeout(() => {
      getTopTracks();
    }, 1000)

  }, []);

  return (
    <section className={styles.topTracksSection}>
      <h2>Mais Escutadas</h2>

      <div className={styles.topTracksContent}>
        {topTracks.map((track, index) => {
          return (
            (
              <div key={index} className={styles.topTrack}>
                <span>{index + 1}</span>
                <div>
                  <a target={'_blank'} href={track.songUrl}>{track.name}</a>
                  <span>{track.artists}</span>
                </div>
              </div>
            )
          );
        })}

      </div>
    </section>
  );
}
