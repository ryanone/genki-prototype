import { CiGrid2H, CiGrid2V } from 'react-icons/ci';
import { FaArrowsRotate, FaBook } from 'react-icons/fa6';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  chooseChoice,
  fillRemainingAnswers,
  restart,
  selectIsFinished,
  selectLayoutConfiguration,
  selectRemainingChoices,
  selectResults,
  toggleLayout,
} from '@/features/dragDrop/slice';
import ExerciseResults from '@/components/ExerciseResults';
import HorizontalDropTargetList from '@/components/HorizontalDropTargetList';
import Instructions from '@/components/Instructions';
import MemoizedDraggableItem from '@/components/MemoizedDraggableItem';
import ReviewDialog from '@/components/ReviewDialog';
import Timer from '@/components/Timer';
import VerticalDropTargetList from '@/components/VerticalDropTargetList';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import type { LayoutConfigurationHorizontal } from '@/utils/dragDrop';
import styles from './DragDrop.module.css';
import commonStyles from '@/styles/common.module.css';

export default function DragDrop() {
  const selectedChoiceId = useRef<string | undefined>(undefined);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  const dispatch = useAppDispatch();
  const layout = useAppSelector((state) => state.dragDrop.layout);
  const layoutConfig = useAppSelector(selectLayoutConfiguration);
  const results = useAppSelector(selectResults);
  const startTime = useAppSelector((state) => state.dragDrop.startTime);
  const remainingChoices = useAppSelector(selectRemainingChoices);
  const isFinished = useAppSelector(selectIsFinished);

  const isHorizontal = useMemo(() => layout !== 'VERTICAL', [layout]);
  const rootClasses = [
    styles.dragDrop,
    isHorizontal ? styles.horizontal : styles.vertical,
  ];

  const handleDropTargetDrop = (questionId: string) => {
    if (selectedChoiceId.current) {
      dispatch(
        chooseChoice({ choiceId: selectedChoiceId.current, questionId }),
      );
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
    dispatch(restart());
    setShowReviewDialog(false);
  };
  const canChangeLayout =
    !isFinished && layoutConfig?.canSupportMultipleLayouts;
  const isTimerRunning = !isFinished && !showReviewDialog;

  useEffect(() => {
    // If not clicking on another choice, or a drop zone, set the selected choice to undefined
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (
        target.attributes.getNamedItem('data-drop-target-zone')?.value !==
          'true' &&
        target.attributes.getNamedItem('data-draggable-item')?.value !== 'true'
      ) {
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
      {isFinished && results ? (
        <ExerciseResults
          exerciseType="DRAG_DROP"
          numSolved={results.numSolved}
          numWrong={results.numWrong}
          timeElapsed={timeElapsed}
          onRestart={handleRestart}
        />
      ) : null}
      {layoutConfig?.instructions ? (
        <Instructions>{layoutConfig.instructions}</Instructions>
      ) : null}
      <div className={styles.main}>
        {isHorizontal && layoutConfig ? (
          <HorizontalDropTargetList
            layoutConfig={layoutConfig as LayoutConfigurationHorizontal}
            onDropTargetDrop={handleDropTargetDrop}
          />
        ) : (
          <VerticalDropTargetList onDropTargetDrop={handleDropTargetDrop} />
        )}
        <div className={styles.choices}>
          {remainingChoices.map((choice) => (
            <MemoizedDraggableItem
              key={choice.id}
              val={choice}
              onSelect={handleChoiceSelect}
              onUnselect={handleChoiceUnselect}
            />
          )) ?? null}
        </div>
      </div>
      <div className={styles.actions}>
        {isFinished ? (
          <button
            className={`${styles.button} ${commonStyles.button}`}
            onClick={handleRestart}
            type="button"
          >
            <FaArrowsRotate
              className={commonStyles.buttonIcon}
              role="presentation"
            />
            Restart
          </button>
        ) : (
          <button
            className={`${styles.button} ${commonStyles.button}`}
            onClick={() => setShowReviewDialog(true)}
            type="button"
          >
            <FaBook className={commonStyles.buttonIcon} role="presentation" />
            Review
          </button>
        )}
        {canChangeLayout && (
          <button
            className={`${styles.button} ${commonStyles.button}`}
            onClick={handleChangeLayoutClick}
            type="button"
          >
            {isHorizontal ? (
              <>
                <CiGrid2V
                  className={commonStyles.buttonIcon}
                  role="presentation"
                />
                Vertical Mode
              </>
            ) : (
              <>
                <CiGrid2H
                  className={commonStyles.buttonIcon}
                  role="presentation"
                />
                Horizontal Mode
              </>
            )}
          </button>
        )}
      </div>
      <Timer
        key={`${startTime}`}
        isRunning={isTimerRunning}
        onStop={setTimeElapsed}
      />
      <ReviewDialog
        isOpen={showReviewDialog}
        onConfirm={handleReviewConfirm}
        onCancel={() => setShowReviewDialog(false)}
      />
    </div>
  );
}
