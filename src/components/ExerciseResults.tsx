import { FaArrowsRotate } from 'react-icons/fa6';
import { formatTimer } from '@/utils/time';
import type { ChoiceItem } from '@/components/ChoiceButton';
import './ExerciseResults.css';

type ExerciseResultsProps = {
  answers: ChoiceItem[][];
  timeElapsed: number;
  onRestart: () => void;
}

export default function ExerciseResults({ answers, timeElapsed, onRestart }: ExerciseResultsProps) {
  const numSolved = answers.length;
  const numWrong = answers.filter(a => !!a.find(c => c.result === 'INCORRECT')).length;
  const score = Math.floor((numSolved - numWrong) / numSolved) * 100;
  let message;
  if (score === 100) {
    message = <p className="exerciseresults__advice">PERFECT! Great job!</p>
  } else if (score > 70) {
    message = <p className="exerciseresults__advice">Nice work!</p>
  } else {
    message = <p className="exerciseresults__advice">Keep studying!</p>
  }

  return (
    <div className="exerciseresults">
      <div className="exerciseresults__header">Quiz Complete!</div>
      <table className="exerciseresults__content">
        <tr>
          <th className="exerciseresults__term" scope="row">Problems Solved:</th>
          <td className="exerciseresults__value">{numSolved}</td>
        </tr>
        <tr>
          <th className="exerciseresults__term" scope="row">Answers Wrong:</th>
          <td className="exerciseresults__value">{numWrong}</td>
        </tr>
        <tr>
          <th className="exerciseresults__term" scope="row">Score:</th>
          <td className="exerciseresults__value">{score}</td>
        </tr>
        <tr>
          <th className="exerciseresults__term" scope="row">Completion Time:</th>
          <td className="exerciseresults__value">{formatTimer(timeElapsed)}</td>
        </tr>
      </table>
      <div className="exerciseresults__footer">
        {message}
        <button className="exerciseresults__button" onClick={onRestart}><FaArrowsRotate className="dragdrop__review-icon" role="presentation"/>Try Again</button>
      </div>
    </div>
  )
}
