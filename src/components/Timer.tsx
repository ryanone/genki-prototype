import { useEffect, useState } from 'react';
import './Timer.css';

type TimerProps = {
  isRunning: boolean;
  onTick?: (numSeconds: number) => void;
};

export default function Timer({ isRunning, onTick }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const numHours = Math.floor(seconds / 3600);
  const numMinutes = Math.floor(seconds / 60);
  const numSeconds = seconds % 60;

  useEffect(() => {
    let intervalId: number|undefined;
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setSeconds(s => {
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
  }, [isRunning, onTick])

  return (
    <div className="timer">
      <div className="timer__heading">Time Elapsed</div>
      <div className="timer__count">{`${numHours}`.padStart(2, '0')}:{`${numMinutes}`.padStart(2, '0')}:{`${numSeconds}`.padStart(2, '0')}</div>
    </div>
  )
}