import React, { useEffect, useState } from 'react';
import { useSpotify } from '../../hooks/useSpotify';

import styles from './styles.module.scss';

let countdownTimeout: NodeJS.Timeout;

export function CountDown() {
  const [time, setTime] = useState(25 * 60);
  const [isCountDownActive, setIsCountDownActive] = useState(false);
  const [isPauseCountDownActive, setIsPauseCountDownActive] = useState(false);
  const [queueTrackCount, setQueueTrackCount] = useState(0);

  const minute = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteFirstNumber, minuteSecondNumber] = String(minute).padStart(2, '0').split('');
  const [secondFirstNumber, secondSecondNumber] = String(seconds).padStart(2, '0').split('');

  const spotifyAPI = useSpotify();

  useEffect(() => {
    async function countDown() {
      if (isCountDownActive && time > 0) {
        countdownTimeout = setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      } else if (time <= 0) {
        setIsCountDownActive(false);
        setIsPauseCountDownActive(true);
        setTime(5 * 60);
        if (spotifyAPI.getAccessToken()) {
          try {
            await spotifyAPI.pause();
          } catch (error) {
            console.log(error);
          }
        }
      }

      if (isPauseCountDownActive && time <= 0) {
        setTime(25 * 60);
        setIsPauseCountDownActive(false);
      }
    }

    countDown();
  }, [time, isCountDownActive]);

  async function addTrackToQueue() {
    if (spotifyAPI.getAccessToken()) {
      const { body: { tracks } } = await spotifyAPI.getPlaylist('2CIfr2KNG8eNmC2DLGIRNU');
      const {body: { devices } } = await spotifyAPI.getMyDevices();
      console.log(devices)
      if (devices) {
        setTimeout(async () => {
          await spotifyAPI.addToQueue(tracks.items[queueTrackCount].track.uri);
          setQueueTrackCount(queueTrackCount + 1);
        }, 5000);
      }
    }
  }

  useEffect(() => {
    addTrackToQueue();
  }, [queueTrackCount]);

  useEffect(() => {
    async function checkIfActiveDeviceExists() {
      if (spotifyAPI.getAccessToken()) {
        const { body: { devices } } = await spotifyAPI.getMyDevices();
        const activeDevices = devices.some((device) => device.is_active);

        if (!activeDevices) {
          console.error('Nenhum dispositivo ativo foi encontrado!');
        }
      }
    }
    checkIfActiveDeviceExists();
  }, []);

  async function startCountdown() {
    if (!isPauseCountDownActive) {
      if (spotifyAPI.getAccessToken()) {
        try {
          await spotifyAPI.play();
        } catch (error) {
          console.error('Ocorreu um erro');
          return;
        }
      }
    }
    setIsCountDownActive(true);
  }

  async function stopCountdown() {
    if (spotifyAPI.getAccessToken()) {
      try {
        await spotifyAPI.pause();
      } catch (error) {
        console.log(error);
      }
    }
    clearTimeout(countdownTimeout);
    setIsCountDownActive(false);
  }

  async function resetCountdown() {
    if (spotifyAPI.getAccessToken()) {
      const { body: { is_playing } } = await spotifyAPI.getMyCurrentPlayingTrack();

      if (is_playing) {
        await spotifyAPI.seek(0);
        await spotifyAPI.pause();
      }
    }
    clearTimeout(countdownTimeout);
    setIsCountDownActive(false);
    setTime(25 * 60);
  }

  return (
    <section className={styles.countDownContainer}>
      <div className={styles.countDownClock}>
        <div>
          <span>
            {minuteFirstNumber}
            {minuteSecondNumber}
          </span>
        </div>
        :
        <div>
          <span>
            {secondFirstNumber}
            {secondSecondNumber}
          </span>
        </div>
      </div>

      <div className={styles.countDownControllers}>
        {isCountDownActive ? (
          <button onClick={stopCountdown} type="button">
            Stop
          </button>
        ) : (
          <button onClick={startCountdown} type="button">
            Start
          </button>
        )}

        <button onClick={resetCountdown} type="button">
          Reset
        </button>
      </div>
    </section>
  );
}
