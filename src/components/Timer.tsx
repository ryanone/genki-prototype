import { useEffect, useState } from 'react';
import { formatTimer } from '@/utils/time';
import './Timer.css';

type TimerProps = {
  isRunning: boolean;
  onTick?: (numSeconds: number) => void;
};

export default function Timer({ isRunning, onTick }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

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
      <div className="timer__count">{formatTimer(seconds)}</div>
    </div>
  )
}