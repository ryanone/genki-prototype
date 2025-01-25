import { FaArrowsRotate } from 'react-icons/fa6';
import { ReactNode } from 'react';
import formatTimer from '@/utils/time';
import type { ExerciseType } from '@/data/exercise';
import {
  adviceClass,
  adviceContent,
  buttonClass,
  contentClass,
  exerciseResultsClass,
  footerClass,
  headerClass,
  termClass,
  valueClass,
} from './ExerciseResults.css';

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
        <span className={adviceContent({ mode: 'incorrect' })}>red</span>. The
        correct answers are outlined in{' '}
        <span className={adviceContent({ mode: 'unselectedCorrect' })}>
          blue
        </span>
        . Review these problems before trying again.
      </>
    );
  } else if (exerciseType === 'WRITING_PRACTICE') {
    typeSpecific = (
      <>
        The items outlined in{' '}
        <span className={adviceContent({ mode: 'incorrect' })}>red</span> were
        answered wrong before finding the correct answer. Review these problems
        before trying again.
      </>
    );
  } else if (exerciseType === 'SHORT_ANSWER') {
    typeSpecific = (
      <>
        The items underlined in{' '}
        <span className={adviceContent({ mode: 'incorrect' })}>red</span> were
        answered wrong, and the correct answers are underlined in{' '}
        <span className={adviceContent({ mode: 'correct' })}>green</span>.
        Review these problems before trying again.
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
    <p className={adviceClass} data-testid="exercise-results-advice">
      {getAdvice(exerciseType, score)}
    </p>
  );

  return (
    <div className={exerciseResultsClass}>
      <div className={headerClass}>Quiz Complete!</div>
      <table className={contentClass}>
        <tbody>
          <tr>
            <th className={termClass} scope="row">
              Problems Solved:
            </th>
            <td
              className={valueClass}
              data-testid="exercise-results-num-solved"
            >
              {numSolved}
            </td>
          </tr>
          <tr>
            <th className={termClass} scope="row">
              Answers Wrong:
            </th>
            <td className={valueClass} data-testid="exercise-results-num-wrong">
              {numWrong}
            </td>
          </tr>
          <tr>
            <th className={termClass} scope="row">
              Score:
            </th>
            <td className={valueClass} data-testid="exercise-results-score">
              {score}%
            </td>
          </tr>
          <tr>
            <th className={termClass} scope="row">
              Completion Time:
            </th>
            <td
              className={valueClass}
              data-testid="exercise-results-time-elapsed"
            >
              {formatTimer(timeElapsed)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={footerClass}>
        {message}
        <button className={buttonClass} onClick={onRestart} type="button">
          <FaArrowsRotate role="presentation" />
          Try Again
        </button>
      </div>
    </div>
  );
}
