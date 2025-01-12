import { useState, type ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa6';
import CheckAnswersDialog from '@/components/CheckAnswersDialog';
import ExerciseResults from '@/components/ExerciseResults';
import Instructions from '@/components/Instructions';
import Timer from '@/components/Timer';
import WritingAnswerItem from '@/components/WritingAnswerItem';
import {
  restart,
  review,
  selectItems,
  selectResults,
  setAnswer,
} from '@/features/shortAnswer/slice';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import commonStyles from '@/styles/common.module.css';
import styles from './ShortAnswer.module.css';

export default function ShortAnswer() {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [checkAnswersDialogContent, setCheckAnswersDialogContent] = useState<
    ReactNode | undefined
  >();
  const dispatch = useAppDispatch();
  const instructions = useAppSelector(
    (state) => state.shortAnswer.meta?.instructions,
  );
  const items = useAppSelector(selectItems);
  const results = useAppSelector(selectResults);
  const isFinished = useAppSelector((state) => state.shortAnswer.isFinished);
  const handleAnswerChange = (questionId: string, value: string) => {
    dispatch(
      setAnswer({
        answer: value,
        questionId,
      }),
    );
  };
  const handleCheckAnswersClick = () => {
    setCheckAnswersDialogContent(
      <p>Checking your answers will end the quiz. Do you want to continue?</p>,
    );
  };
  const handleRestart = () => {
    dispatch(restart());
  };
  const handleReviewCancel = () => {
    setCheckAnswersDialogContent(undefined);
  };
  const handleReviewConfirm = () => {
    dispatch(review());
    setCheckAnswersDialogContent(undefined);
  };
  return (
    <div className={styles.shortAnswer}>
      {isFinished && results && (
        <ExerciseResults
          exerciseType="SHORT_ANSWER"
          numSolved={results.numSolved}
          numWrong={results.numWrong}
          timeElapsed={timeElapsed}
          onRestart={handleRestart}
        />
      )}
      {instructions ? <Instructions>{instructions}</Instructions> : null}
      <div className={styles.items}>
        {items.map((item, i) => {
          return (
            <WritingAnswerItem
              data={item}
              key={item.question.id!}
              index={i + 1}
              onAnswerChange={handleAnswerChange}
            />
          );
        })}
      </div>
      <div className={styles.actions}>
        {!isFinished && (
          <button
            onClick={handleCheckAnswersClick}
            className={`${commonStyles.button} ${styles.checkAnswersButton}`}
            type="button"
          >
            <FaCheck role="presentation" />
            Check Answers
          </button>
        )}
      </div>
      <Timer isRunning={!isFinished} onStop={setTimeElapsed} />
      <CheckAnswersDialog
        content={checkAnswersDialogContent}
        isOpen={!!checkAnswersDialogContent}
        onCancel={handleReviewCancel}
        onConfirm={handleReviewConfirm}
      />
    </div>
  );
}
