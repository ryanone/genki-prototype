import { useEffect, useState } from 'react';
import formatTimer from '@/utils/time';
import * as styles from './Timer.css';

type TimerProps = {
  isRunning: boolean;
  onStop?: (numSeconds: number) => void;
};

export default function Timer({ isRunning, onStop }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning && isVisible) {
      intervalId = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isVisible]);

  useEffect(() => {
    if (!isRunning && onStop) {
      onStop(seconds);
    }
  }, [isRunning, onStop, seconds]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState !== 'hidden');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    setIsVisible(document.visibilityState !== 'hidden');

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className={styles.timerClass}>
      <div className={styles.timerContentClass}>Time Elapsed</div>
      <div className={styles.timerContentClass} role="timer" aria-live="polite">
        {formatTimer(seconds)}
      </div>
    </div>
  );
}
