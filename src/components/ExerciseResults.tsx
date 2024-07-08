import { FaArrowsRotate } from 'react-icons/fa6';
import { formatTimer } from '@/utils/time';
import styles from './ExerciseResults.module.css';

type ExerciseResultsProps = {
  numSolved: number;
  numWrong: number;
  timeElapsed: number;
  onRestart: () => void;
}

export default function ExerciseResults({ numSolved, numWrong, timeElapsed, onRestart }: ExerciseResultsProps) {
  const score = Math.floor((numSolved - numWrong) / numSolved * 100);
  let message;
  if (score === 100) {
    message = <p className={styles.advice}>PERFECT! Great job!</p>
  } else if (score > 70) {
    message = <p className={styles.advice}>Nice work!</p>
  } else {
    message = <p className={styles.advice}>Keep studying!</p>
  }

  return (
    <div className={styles.exerciseResults}>
      <div className={styles.header}>Quiz Complete!</div>
      <table className={styles.content}>
        <tbody>
          <tr>
            <th className={styles.term} scope="row">Problems Solved:</th>
            <td className={styles.value}>{numSolved}</td>
          </tr>
          <tr>
            <th className={styles.term} scope="row">Answers Wrong:</th>
            <td className={styles.value}>{numWrong}</td>
          </tr>
          <tr>
            <th className={styles.term} scope="row">Score:</th>
            <td className={styles.value}>{score}%</td>
          </tr>
          <tr>
            <th className={styles.term} scope="row">Completion Time:</th>
            <td className={styles.value}>{formatTimer(timeElapsed)}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.footer}>
        {message}
        <button className={styles.button} onClick={onRestart}><FaArrowsRotate className="dragdrop__review-icon" role="presentation"/>Try Again</button>
      </div>
    </div>
  )
}
