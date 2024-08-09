import { FaArrowsRotate } from 'react-icons/fa6';
import { ReactNode } from 'react';
import formatTimer from '@/utils/time';
import type { ExerciseType } from '@/data/exercise';
import styles from './ExerciseResults.module.css';
import commonStyles from '@/styles/common.module.css';

type ExerciseResultsProps = {
  exerciseType: ExerciseType;
  numSolved: number;
  numWrong: number;
  onRestart: () => void;
  timeElapsed: number;
};

function getAdvice(exerciseType: ExerciseType, score: number): ReactNode {
  if (score === 100) {
    return <>PERFECT! Great job!</>;
  }
  const generic = score > 70 ? <>Nice work!</> : <>Keep studying!</>;
  let typeSpecific: ReactNode | null = null;
  if (exerciseType === 'MULTIPLE_CHOICE') {
    typeSpecific = (
      <>
        The answers you selected that were wrong are outlined in{' '}
        <span className={styles.incorrect}>red</span>. The correct answers are
        outlined in <span className={styles.unselectedCorrect}>blue</span>.
        Review these problems before trying again.
      </>
    );
  } else if (exerciseType === 'WRITING_PRACTICE') {
    typeSpecific = (
      <>
        The items outlined in <span className={styles.incorrect}>red</span> were
        answered wrong before finding the correct answer. Review these problems
        before trying again.
      </>
    );
  } else if (exerciseType === 'SHORT_ANSWER') {
    typeSpecific = (
      <>
        The items underlined in <span className={styles.incorrect}>red</span>{' '}
        were answered wrong, and the correct answers are underlined in{' '}
        <span className={styles.correct}>green</span>. Review these problems
        before trying again.
      </>
    );
  }

  return (
    <>
      {generic} {typeSpecific}
    </>
  );
}

export default function ExerciseResults({
  exerciseType,
  numSolved,
  numWrong,
  timeElapsed,
  onRestart,
}: ExerciseResultsProps) {
  const score = Math.floor(((numSolved - numWrong) / numSolved) * 100);
  const message = (
    <p className={styles.advice} data-testid="exercise-results-advice">
      {getAdvice(exerciseType, score)}
    </p>
  );

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
