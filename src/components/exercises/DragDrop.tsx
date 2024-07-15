import { CiGrid2H, CiGrid2V } from 'react-icons/ci';
import { FaArrowsRotate, FaBook, FaCircleInfo } from 'react-icons/fa6';
import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  chooseChoice,
  initialize,
  fillRemainingAnswers,
  selectIsFinished,
  selectLayoutConfiguration,
  selectRemainingChoices,
  selectResults,
  toggleLayout,
} from '@/features/dragDrop/dragDropSlice';
import DraggableItem from '@/components/DraggableItem';
import ExerciseResults from '@/components/ExerciseResults';
import HorizontalDropTargetList from '@/components/HorizontalDropTargetList';
import ReviewDialog from '@/components/ReviewDialog';
import Timer from '@/components/Timer';
import VerticalDropTargetList from '@/components/VerticalDropTargetList';
import useAppSelector from '@/hooks/useAppSelector';
import type { DragDropExercise } from '@/data/exercise';
import type { LayoutConfigurationHorizontal } from '@/utils/dragDrop';
import styles from './DragDrop.module.css';
import commonStyles from '@/styles/common.module.css';

type DragDropProps = {
  data: DragDropExercise;
};

export default function DragDrop({ data }: DragDropProps) {
  const selectedChoiceId = useRef<string | undefined>(undefined);
  const timeElapsed = useRef(0);
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  const dispatch = useDispatch();
  const layout = useAppSelector((state) => state.dragDrop.layout);
  const layoutConfig = useAppSelector(selectLayoutConfiguration);
  const results = useAppSelector(selectResults);
  const startTime = useAppSelector((state) => state.dragDrop.startTime);
  const remainingChoices = useAppSelector(selectRemainingChoices);
  const isFinished = useAppSelector(selectIsFinished);

  const isHorizontal = useMemo(() => layout !== 'VERTICAL', [layout]);
  const rootClasses = [styles.dragDrop, isHorizontal ? styles.horizontal : styles.vertical];

  const handleDropTargetDrop = (questionId: string) => {
    if (selectedChoiceId.current) {
      dispatch(chooseChoice({ choiceId: selectedChoiceId.current, questionId }));
    }
    selectedChoiceId.current = undefined;
  };
  const handleChangeLayoutClick = () => {
    dispatch(toggleLayout());
  };
  const handleChoiceSelect = (id: string) => {
    selectedChoiceId.current = id;
  };
  // NOTE: This is wrapped by useCallback() since it's referenced by the useEffect() callback.
  // This is to avoid re-render loops
  const handleChoiceUnselect = useCallback(() => {
    selectedChoiceId.current = undefined;
  }, []);
  const handleReviewConfirm = () => {
    setShowReviewDialog(false);
    dispatch(fillRemainingAnswers());
  };
  const handleRestart = () => {
    selectedChoiceId.current = undefined;
    dispatch(initialize({
      exercise: data,
    }));
    setShowReviewDialog(false);
  };
  const canChangeLayout = !isFinished && layoutConfig?.canSupportMultipleLayouts;
  const isTimerRunning = !isFinished && !showReviewDialog;

  useEffect(() => {
    dispatch(initialize({
      exercise: data,
    }));
  }, [data, dispatch]);

  useEffect(() => {
    // If not clicking on another choice, or a drop zone, set the selected choice to undefined
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.attributes.getNamedItem('data-drop-target-zone')?.value !== 'true'
          && target.attributes.getNamedItem('data-draggable-item')?.value !== 'true') {
        handleChoiceUnselect();
      }
    };
    document.body.addEventListener('click', handleDocumentClick);

    return () => {
      document.body.removeEventListener('click', handleDocumentClick);
    };
  }, [handleChoiceUnselect]);

  return (
    <div className={rootClasses.join(' ')}>
      {
        (isFinished && results)
          ? (
            <ExerciseResults
              numSolved={results.numSolved}
              numWrong={results.numWrong}
              timeElapsed={timeElapsed.current}
              onRestart={handleRestart}
            />
          )
          : null
      }
      {layoutConfig?.instructions && (
      <div className={styles.instructions}>
        <FaCircleInfo className={styles.instructionsIcon} role="presentation" />
        {layoutConfig.instructions}
      </div>
      )}
      <div className={styles.main}>
        {
          (isHorizontal && layoutConfig)
            ? (
              <HorizontalDropTargetList
                layoutConfig={layoutConfig as LayoutConfigurationHorizontal}
                onDropTargetDrop={handleDropTargetDrop}
              />
            )
            : <VerticalDropTargetList onDropTargetDrop={handleDropTargetDrop} />
        }
        <div className={styles.choices}>
          {
            remainingChoices.map((choice) => (
              <DraggableItem
                key={choice.id}
                val={choice}
                onSelect={handleChoiceSelect}
                onUnselect={handleChoiceUnselect}
              />
            )) ?? null
          }
        </div>
      </div>
      <div className={styles.actions}>
        {
          isFinished
            ? (
              <button className={`${styles.button} ${commonStyles.button}`} onClick={handleRestart} type="button">
                <FaArrowsRotate className={commonStyles.buttonIcon} role="presentation" />
                Restart
              </button>
            )
            : (
              <button
                className={`${styles.button} ${commonStyles.button}`}
                onClick={() => setShowReviewDialog(true)}
                type="button"
              >
                <FaBook className={commonStyles.buttonIcon} role="presentation" />
                Review
              </button>
            )
        }
        {
          canChangeLayout && (
          <button className={`${styles.button} ${commonStyles.button}`} onClick={handleChangeLayoutClick} type="button">
            {
              isHorizontal
                ? (
                  <>
                    <CiGrid2V className={commonStyles.buttonIcon} role="presentation" />
                    Vertical Mode
                  </>
                )
                : (
                  <>
                    <CiGrid2H className={commonStyles.buttonIcon} role="presentation" />
                    Horizontal Mode
                  </>
                )
            }
          </button>
          )
        }
      </div>
      <Timer
        key={`${startTime}`}
        isRunning={isTimerRunning}
        onTick={(numSeconds) => { timeElapsed.current = numSeconds; }}
      />
      <ReviewDialog
        isOpen={showReviewDialog}
        onConfirm={handleReviewConfirm}
        onCancel={() => setShowReviewDialog(false)}
      />
    </div>
  );
}
