import { lazy, useContext, useEffect, useState, Suspense } from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';
import {
  initialize as initializeDragDrop,
  reset as resetDragDrop,
} from '@/features/dragDrop/dragDropSlice';
import {
  initialize as initializeMultipleChoice,
  reset as resetMultipleChoice,
} from '@/features/multipleChoice/multipleChoiceSlice';
import type {
  DragDropExercise,
  Exercise,
  MultipleChoiceExercise,
  RenderMode,
} from '@/data/exercise';
import ChangeExerciseTypeDialog from '@/components/ChangeExerciseTypeDialog';
import MultipleChoiceSettingsContext from '@/context/MultipleChoiceSettingsContext';
import useAppDispatch from '@/hooks/useAppDispatch';
import styles from './ExerciseRenderer.module.css';
import commonStyles from '@/styles/common.module.css';
import useAppSelector from '@/hooks/useAppSelector';
import type { RootState } from '@/app/store';

type ExerciseRendererProps = {
  data: Exercise;
};

const DragDrop = lazy(() => import('@/components/exercises/DragDrop'));
const MultipleChoice = lazy(
  () => import('@/components/exercises/MultipleChoice'),
);

export default function ExerciseRenderer({ data }: ExerciseRendererProps) {
  const [renderMode, setRenderMode] = useState(data.supportedRenderModes[0]);
  const dispatch = useAppDispatch();
  const isDragDropInitialized = useAppSelector(
    (state: RootState) => state.dragDrop.initialized,
  );
  const isMultipleChoiceInitialized = useAppSelector(
    (state: RootState) => state.multipleChoice.initialized,
  );
  const { settings: multipleChoiceSettings } = useContext(
    MultipleChoiceSettingsContext,
  );

  useEffect(() => {
    if (renderMode === 'DRAG_DROP') {
      dispatch(resetMultipleChoice());
      dispatch(
        initializeDragDrop({
          exercise: data as DragDropExercise,
        }),
      );
    } else if (renderMode === 'MULTIPLE_CHOICE') {
      dispatch(resetDragDrop());
      dispatch(
        initializeMultipleChoice({
          exercise: data as MultipleChoiceExercise,
          questionFeedback: multipleChoiceSettings.feedback,
        }),
      );
    }
  }, [data, dispatch, multipleChoiceSettings.feedback, renderMode]);

  const canChangeRenderMode = data.supportedRenderModes.length > 1;
  const [showChangeRenderModeDialog, setShowChangeRenderModeDialog] =
    useState(false);
  const handleRenderModeChoose = (value: RenderMode) => {
    setRenderMode(value);
    setShowChangeRenderModeDialog(false);
  };

  let exercise;
  if (isDragDropInitialized) {
    exercise = <DragDrop key={Date.now()} />;
  } else if (isMultipleChoiceInitialized) {
    exercise = <MultipleChoice key={Date.now()} />;
  }

  return (
    <div>
      <Suspense
        fallback={
          <p className={styles.loading} role="alert">
            Loading...
          </p>
        }
      >
        {exercise}
      </Suspense>
      {canChangeRenderMode && (
        <>
          <button
            className={`${styles.renderModeButton} ${commonStyles.button}`}
            onClick={() => setShowChangeRenderModeDialog(true)}
            type="button"
          >
            <FaArrowsRotate role="presentation" />
            Change Exercise Type
          </button>
          <ChangeExerciseTypeDialog
            isOpen={showChangeRenderModeDialog}
            exercise={data}
            onCancel={() => setShowChangeRenderModeDialog(false)}
            onRenderModeChoose={handleRenderModeChoose}
          />
        </>
      )}
    </div>
  );
}
