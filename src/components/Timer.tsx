import { useEffect, useState } from 'react';
import formatTimer from '@/utils/time';
import styles from './Timer.module.css';

type TimerProps = {
  isRunning: boolean;
  onTick?: (numSeconds: number) => void;
};

export default function Timer({ isRunning, onTick }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning && isVisible) {
      intervalId = window.setInterval(() => {
        setSeconds((s) => {
          const nextTick = s + 1;
          if (onTick) {
            onTick(nextTick);
          }
          return nextTick;
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isVisible, onTick]);

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
    <div className={styles.timer}>
      <div className={styles.heading}>Time Elapsed</div>
      <div className={styles.count} role="timer" aria-live="polite">
        {formatTimer(seconds)}
      </div>
    </div>
  );
}
