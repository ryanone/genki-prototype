import { useEffect, useState } from 'react';
import './Timer.css';

type TimerProps = {
  isRunning: boolean;
};

export default function Timer({ isRunning }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const numHours = Math.floor(seconds / 3600);
  const numMinutes = Math.floor(seconds / 60);
  const numSeconds = seconds % 60;

  useEffect(() => {
    let intervalId: number|undefined;
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setSeconds(p => p + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning])

  return (
    <div className="timer">
      <div className="timer__heading">Time Elapsed</div>
      <div className="timer__count">{`${numHours}`.padStart(2, '0')}:{`${numMinutes}`.padStart(2, '0')}:{`${numSeconds}`.padStart(2, '0')}</div>
    </div>
  )
}