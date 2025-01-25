import { useContext, useState } from 'react';
import {
  chooseChoice,
  goToNextQuestion,
  restart,
  selectCurrentAnswer,
  selectIsFinished,
  selectResults,
  type ChoiceData,
} from '@/features/multipleChoice/slice';
import AnswerList, { type FilledAnswer } from '@/components/AnswerList';
import ExerciseResults from '@/components/ExerciseResults';
import Instructions from '@/components/Instructions';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import ProgressBar from '@/components/ProgressBar';
import Ruby from '@/components/Ruby';
import ShowFuriganaContext from '@/context/ShowFuriganaContext';
import Timer from '@/components/Timer';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import * as styles from './MultipleChoice.css';

export default function MultipleChoice() {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const { showFurigana } = useContext(ShowFuriganaContext);
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
      className={styles.nextButtonClass}
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
          questionContent={
            <Ruby
              showAlt={showFurigana}
              content={currentAnswer.question.content}
              alt={currentAnswer.question.alt}
            />
          }
          onChoiceSelect={handleChoiceSelect}
        />
        <div className={styles.actionsClass}>{nextButton}</div>
        <ProgressBar current={currentIndex} total={answers.length} />
        <Timer isRunning={!isFinished} onStop={setTimeElapsed} />
      </>
    );
  return (
    <div className={styles.multipleChoiceClass}>
      {isFinished && results ? (
        <>
          <ExerciseResults
            exerciseType="MULTIPLE_CHOICE"
            numSolved={results.numSolved}
            numWrong={results.numWrong}
            timeElapsed={timeElapsed}
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
