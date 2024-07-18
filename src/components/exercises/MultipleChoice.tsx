import { useEffect, useRef } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import {
  chooseChoice,
  goToNextQuestion,
  initialize,
  selectCurrentAnswer,
  selectIsFinished,
  selectResults,
  type ChoiceData,
} from '@/features/multipleChoice/multipleChoiceSlice';
import AnswerList, { type FilledAnswer } from '@/components/AnswerList';
import ExerciseResults from '@/components/ExerciseResults';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import ProgressBar from '@/components/ProgressBar';
import Timer from '@/components/Timer';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import type { MultipleChoiceExercise } from '@/data/exercise';
import styles from './MultipleChoice.module.css';

type MultipleChoiceProps = {
  data: MultipleChoiceExercise;
};

export default function MultipleChoice({ data }: MultipleChoiceProps) {
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

  useEffect(() => {
    dispatch(
      initialize({
        exercise: data,
      }),
    );
  }, [data, dispatch]);

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
    dispatch(
      initialize({
        exercise: data,
      }),
    );
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
        {instructions && (
          <div className={styles.instructions}>
            <FaCircleInfo
              className={styles.instructionsIcon}
              role="presentation"
            />
            {instructions}
          </div>
        )}
        <MultipleChoiceQuestion
          key={currentIndex}
          choices={currentAnswer.choices as ChoiceData[]}
          index={currentIndex}
          isDisabled={isQuestionFinished}
          question={currentAnswer.question}
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
