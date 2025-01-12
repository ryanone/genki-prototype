import { useRef, useState, type ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa6';
import ExerciseResults from '@/components/ExerciseResults';
import Instructions from '@/components/Instructions';
import CheckAnswersDialog from '@/components/CheckAnswersDialog';
import Timer from '@/components/Timer';
import WritingPracticeRow from '@/components/WritingPracticeRow';
import {
  restart,
  review,
  selectResults,
  setAnswer,
} from '@/features/writingPractice/slice';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import type { Ref as WritingInputRefType } from '@/components/WritingInput';
import commonStyles from '@/styles/common.module.css';
import styles from './WritingPractice.module.css';

export default function WritingPractice() {
  const rowRefs = useRef<WritingInputRefType[]>([]);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [checkAnswersDialogContent, setCheckAnswersDialogContent] = useState<
    ReactNode | undefined
  >();
  const dispatch = useAppDispatch();
  const instructions = useAppSelector(
    (state) => state.writingPractice.meta?.instructions,
  );
  const numExamples = useAppSelector(
    (state) => state.writingPractice.meta?.numExamples,
  );
  const numRepetitions = useAppSelector(
    (state) => state.writingPractice.meta?.numRepetitions,
  );
  const rows = useAppSelector((state) => state.writingPractice.rows);
  const isFinished = useAppSelector(
    (state) => state.writingPractice.isFinished,
  );
  const results = useAppSelector(selectResults);
  const startTime = useAppSelector((state) => state.writingPractice.startTime);

  const rowsStyles: Record<string, string> = {
    gridTemplateColumns: `repeat(${(numRepetitions ?? 0) + 1}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows.length}, max-content)`,
  };

  const handleCheckAnswersClick = () => {
    setCheckAnswersDialogContent(
      <p>Checking your answers will end the quiz. Do you want to continue?</p>,
    );
  };

  const handleRowInputChange = (
    questionContent: string,
    column: number,
    value: string,
  ) => {
    dispatch(
      setAnswer({
        questionContent,
        column,
        value,
      }),
    );
  };

  const handleRestart = () => {
    dispatch(restart());
  };

  const handleReviewConfirm = () => {
    dispatch(review());
    setCheckAnswersDialogContent(undefined);
  };

  const handleReviewCancel = () => {
    setCheckAnswersDialogContent(undefined);
  };

  const handleRowComplete = (rowNumber: number) => {
    if (rowNumber < rows.length - 1) {
      rowRefs.current[rowNumber + 1].focus();
    } else {
      setCheckAnswersDialogContent(
        <p>
          The last input field has been filled in. Are you ready to check your
          answers?
        </p>,
      );
    }
  };

  return (
    <div className={styles.writingPractice}>
      {isFinished && results ? (
        <ExerciseResults
          exerciseType="WRITING_PRACTICE"
          numSolved={results.numSolved}
          numWrong={results.numWrong}
          timeElapsed={timeElapsed}
          onRestart={handleRestart}
        />
      ) : null}
      {instructions ? <Instructions>{instructions}</Instructions> : null}
      <div className={styles.rows} style={rowsStyles}>
        {rows.length
          ? rows.map((row, i) => {
              return (
                <WritingPracticeRow
                  key={`${row.question.content}-${startTime}`}
                  numExamples={numExamples ?? 0}
                  numRepetitions={numRepetitions ?? 0}
                  onInputChange={handleRowInputChange}
                  onRowComplete={handleRowComplete}
                  question={row.question}
                  ref={(el) => {
                    if (el) {
                      rowRefs.current[i] = el;
                    }
                  }}
                  rowNumber={i}
                />
              );
            })
          : null}
      </div>
      <Timer
        key={`${startTime}`}
        isRunning={!isFinished}
        onStop={setTimeElapsed}
      />
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
      <CheckAnswersDialog
        content={checkAnswersDialogContent}
        isOpen={!!checkAnswersDialogContent}
        onCancel={handleReviewCancel}
        onConfirm={handleReviewConfirm}
      />
    </div>
  );
}
