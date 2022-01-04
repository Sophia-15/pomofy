import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { GrSpotify } from 'react-icons/gr';
import { IoLogOutOutline } from 'react-icons/io5';
import { useSpotify } from '../../hooks/useSpotify';

import styles from './styles.module.scss';

type Artists = {
  name: string
}
interface TrackProps {
  name: string;
  artists: [
    name: string
  ];
}

export function Header() {
  const { data: session } = useSession();
  const [songData, setSongData] = useState<TrackProps | null>();

  const spotifyAPI = useSpotify();

  async function getNowPlaying() {
    if (spotifyAPI.getAccessToken()) {
      const { item } = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${spotifyAPI.getAccessToken()}`
        }
      })
      .then((response) => response.json())
      if (item) {
        setSongData({
          name: item.name,
          artists: item.artists.map((artist: Artists) => artist.name)
        })
      }

      return;
    }
  }

  useEffect(() => {
    getNowPlaying();
  }, [session, spotifyAPI]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.currentPlaying}>
          <GrSpotify />
          {songData ? (
            <p>
              {songData.name}
              {' '}
              <span>
                -
                {' '}
                {songData.artists}
              </span>
            </p>
          ) : (
            <p>
              Spotify
              {' '}
              <span>
                -
                Nada Tocando
              </span>
            </p>
          )}

        </div>
        <div className={styles.userInfo}>
          <span>{session?.user?.name}</span>
          <img src={session?.user?.image ? session.user.image : 'data:image/png;base64,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'} alt="Foto do Usuário" />
          <button onClick={() => signOut()} type="button">
            <IoLogOutOutline />
          </button>
        </div>
      </div>
    </header>
  );
}
