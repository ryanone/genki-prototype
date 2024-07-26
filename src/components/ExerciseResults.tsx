import { FaArrowsRotate } from 'react-icons/fa6';
import formatTimer from '@/utils/time';
import styles from './ExerciseResults.module.css';
import commonStyles from '@/styles/common.module.css';

type ExerciseResultsProps = {
  numSolved: number;
  numWrong: number;
  onRestart: () => void;
  timeElapsed: number;
};

export default function ExerciseResults({
  numSolved,
  numWrong,
  timeElapsed,
  onRestart,
}: ExerciseResultsProps) {
  const score = Math.floor(((numSolved - numWrong) / numSolved) * 100);
  let message;
  if (score === 100) {
    message = (
      <p className={styles.advice} data-testid="exercise-results-advice">
        PERFECT! Great job!
      </p>
    );
  } else if (score > 70) {
    message = (
      <p className={styles.advice} data-testid="exercise-results-advice">
        Nice work!
      </p>
    );
  } else {
    message = (
      <p className={styles.advice} data-testid="exercise-results-advice">
        Keep studying!
      </p>
    );
  }

  return (
    <div className={styles.exerciseResults}>
      <div className={styles.header}>Quiz Complete!</div>
      <table className={styles.content}>
        <tbody>
          <tr>
            <th className={styles.term} scope="row">
              Problems Solved:
            </th>
            <td
              className={styles.value}
              data-testid="exercise-results-num-solved"
            >
              {numSolved}
            </td>
          </tr>
          <tr>
            <th className={styles.term} scope="row">
              Answers Wrong:
            </th>
            <td
              className={styles.value}
              data-testid="exercise-results-num-wrong"
            >
              {numWrong}
            </td>
          </tr>
          <tr>
            <th className={styles.term} scope="row">
              Score:
            </th>
            <td className={styles.value} data-testid="exercise-results-score">
              {score}%
            </td>
          </tr>
          <tr>
            <th className={styles.term} scope="row">
              Completion Time:
            </th>
            <td
              className={styles.value}
              data-testid="exercise-results-time-elapsed"
            >
              {formatTimer(timeElapsed)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.footer}>
        {message}
        <button
          className={`${styles.button} ${commonStyles.button}`}
          onClick={onRestart}
          type="button"
        >
          <FaArrowsRotate role="presentation" />
          Try Again
        </button>
      </div>
    </div>
  );
}
