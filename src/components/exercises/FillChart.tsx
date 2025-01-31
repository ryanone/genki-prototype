import { Fragment, useState, type ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa6';
import CheckAnswersDialog from '@/components/CheckAnswersDialog';
import ChoiceInput from '@/components/ChoiceInput';
import ExerciseResults from '@/components/ExerciseResults';
import Instructions from '@/components/Instructions';
import Timer from '@/components/Timer';
import {
  restart,
  review,
  selectItemsMap,
  selectResults,
  setAnswer,
} from '@/features/fillChart/slice';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import * as styles from './FillChart.css';

export default function FillChart() {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [checkAnswersDialogContent, setCheckAnswersDialogContent] = useState<
    ReactNode | undefined
  >();
  const instructions = useAppSelector(
    (state) => state.fillChart.meta!.instructions,
  );
  const isFinished = useAppSelector((state) => state.fillChart.isFinished);
  const itemsMap = useAppSelector(selectItemsMap);
  const meta = useAppSelector((state) => state.fillChart.meta!);
  const results = useAppSelector(selectResults);
  const startTime = useAppSelector((state) => state.fillChart.startTime);

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

  const handleCheckAnswersClick = () => {
    setCheckAnswersDialogContent(
      <p>Checking your answers will end the quiz. Do you want to continue?</p>,
    );
  };

  const handleChoiceInputChange = (questionContent: string, value: string) => {
    dispatch(
      setAnswer({
        questionContent,
        answerValue: value,
      }),
    );
  };

  const { configuration } = meta;
  const trackLength = Math.max(...configuration.map((track) => track.length));
  const trackFlow = meta.flow;
  const itemsStyles: Record<string, string> = {};
  if (trackFlow === 'HORIZONTAL') {
    itemsStyles['--grid-auto-flow'] = 'row';
    itemsStyles.gridTemplateColumns = `repeat(${trackLength}, 1fr)`;
  } else {
    itemsStyles['--grid-auto-flow'] = 'column';
    itemsStyles.gridTemplateRows = `repeat(${trackLength}, 1fr)`;
  }

  return (
    <div className={styles.fillChartClass}>
      {isFinished && results ? (
        <ExerciseResults
          exerciseType="FILL_CHART"
          numSolved={results.numSolved}
          numWrong={results.numWrong}
          timeElapsed={timeElapsed}
          onRestart={handleRestart}
        />
      ) : null}
      <Instructions>{instructions}</Instructions>
      <div className={styles.itemsClass} style={itemsStyles}>
        {configuration.map((track, i) =>
          track.map((itemId, j) => {
            if (itemId === '-') {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className={styles.emptyItemClass} key={`item-${i}-${j}`} />
              );
            }
            const item = itemsMap.get(itemId)!;
            return (
              <Fragment key={item.question.content}>
                <ChoiceInput
                  key={`${startTime}`}
                  correctValue={isFinished ? item.question.content : undefined}
                  defaultValue={item.answer.content ?? ''}
                  isDisabled={isFinished}
                  onChange={handleChoiceInputChange}
                  questionContent={item.correctChoice.content}
                  result={item.answer.result}
                />
              </Fragment>
            );
          }),
        )}
      </div>
      <Timer
        key={`${startTime}`}
        isRunning={!isFinished}
        onStop={setTimeElapsed}
      />
      <div className={styles.actionsClass}>
        {!isFinished && (
          <button
            onClick={handleCheckAnswersClick}
            className={styles.checkAnswersButtonClass}
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
