import React from 'react';
import { GrSpotify } from 'react-icons/gr';
import { getSession, signIn } from 'next-auth/react';

import styles from './login.module.scss';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | Pomofy</title>
      </Head>

      <main className={styles.loginPage}>
        <div>
          <h1>Pomofy</h1>
          <p>Um aplicação deixar seus estudos mais dinâmicos!</p>
        </div>
        <button onClick={() => signIn('spotify')} type="button">
          Login com o Spotify
          {' '}
          <GrSpotify />
        </button>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: '/', 
        permanent: false
      }
    }
  }
  
  return {
    props: {}
  }
}