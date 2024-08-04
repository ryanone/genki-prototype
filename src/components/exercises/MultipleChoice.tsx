import { useRef } from 'react';
import {
  chooseChoice,
  goToNextQuestion,
  restart,
  selectCurrentAnswer,
  selectIsFinished,
  selectResults,
  type ChoiceData,
} from '@/features/multipleChoice/multipleChoiceSlice';
import AnswerList, { type FilledAnswer } from '@/components/AnswerList';
import ExerciseResults from '@/components/ExerciseResults';
import Instructions from '@/components/Instructions';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import ProgressBar from '@/components/ProgressBar';
import Timer from '@/components/Timer';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import styles from './MultipleChoice.module.css';

export default function MultipleChoice() {
  const timeElapsed = useRef(0);
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector((state) => state.multipleChoice.index);
  const isQuestionFinished = useAppSelector(
    (state) => state.multipleChoice.isQuestionFinished,
  );
  const answers = useAppSelector((state) => state.multipleChoice.answers);
  const currentAnswer = useAppSelector(selectCurrentAnswer);
  const instructions = useAppSelector(
    (state) => state.multipleChoice.meta?.instructions,
  );
  const isFinished = useAppSelector(selectIsFinished);
  const results = useAppSelector(selectResults);

  const handleChoiceSelect = (id: string) => {
    dispatch(
      chooseChoice({
        choiceId: id,
      }),
    );
  };
  const handleNextClick = () => {
    dispatch(goToNextQuestion());
  };
  const handleRestart = () => {
    dispatch(restart());
  };
  const nextButton = isQuestionFinished && (
    <button
      className={styles.nextButton}
      onClick={handleNextClick}
      type="button"
    >
      NEXT
    </button>
  );

  const exerciseContent = !isFinished &&
    currentAnswer?.choices &&
    instructions && (
      <>
        {instructions ? <Instructions>{instructions}</Instructions> : null}
        <MultipleChoiceQuestion
          key={currentIndex}
          choices={currentAnswer.choices as ChoiceData[]}
          index={currentIndex}
          isDisabled={isQuestionFinished}
          questionContent={currentAnswer.question.content}
          onChoiceSelect={handleChoiceSelect}
        />
        <div className={styles.actions}>{nextButton}</div>
        <ProgressBar current={currentIndex} total={answers.length} />
        <Timer
          isRunning={!isFinished}
          onTick={(numSeconds) => {
            timeElapsed.current = numSeconds;
          }}
        />
      </>
    );
  return (
    <div className={styles.multipleChoice}>
      {isFinished && results ? (
        <>
          <ExerciseResults
            exerciseType="MULTIPLE_CHOICE"
            numSolved={results.numSolved}
            numWrong={results.numWrong}
            timeElapsed={timeElapsed.current}
            onRestart={handleRestart}
          />
          <AnswerList data={answers as FilledAnswer[]} />
        </>
      ) : (
        exerciseContent
      )}
    </div>
  );
}
