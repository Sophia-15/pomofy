import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

let countdownTimeout: NodeJS.Timeout;

export function CountDown() {
  const [time, setTime] = useState(25 * 60);
  const [isCountDownActive, setIsCountDownActive] = useState(false);

  const minute = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteFirstNumber, minuteSecondNumber] = String(minute).padStart(2, '0').split('');
  const [secondFirstNumber, secondSecondNumber] = String(seconds).padStart(2, '0').split('');

  useEffect(() => {
    if (isCountDownActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time, isCountDownActive]);

  function startCountdown() {
    setIsCountDownActive(true);
  }

  function stopCountdown() {
    clearTimeout(countdownTimeout);
    setIsCountDownActive(false);
  }

  function resetCountdown() {
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
