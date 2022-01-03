import React from 'react';
import { GrSpotify } from 'react-icons/gr';
import { signIn } from 'next-auth/react';

import styles from './login.module.scss';

export default function Login() {
  return (
    <main className={styles.loginPage}>
      <h1>Pomodoro Spotify</h1>
      <button onClick={() => signIn('spotify')} type="button">
        Login com o Spotify
        {' '}
        <GrSpotify />
      </button>
    </main>
  );
}
