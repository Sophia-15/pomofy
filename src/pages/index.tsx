import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';
import { CountDown } from '../components/CountDown';
import { Header } from '../components/Header';
import { TopTracks } from '../components/TopTracks';
import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Pomofy</title>
      </Head>

      <Header />
      <main className={styles.mainContainer}>
        <CountDown />
        <TopTracks />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/login', 
        permanent: false
      }
    }
  }
  
  return {
    props: {}
  }
}