import { lazy, useContext, useEffect, useState, Suspense } from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';
import {
  initialize as initializeDragDrop,
  // reset as resetDragDrop,
} from '@/features/dragDrop/dragDropSlice';
import {
  initialize as initializeFillChart,
  // reset as resetFillChart,
} from '@/features/fillChart/fillChartSlice';
import {
  initialize as initializeMultipleChoice,
  // reset as resetMultipleChoice,
} from '@/features/multipleChoice/multipleChoiceSlice';
import {
  initialize as initializeWritingPractice,
  // reset as resetWritingPractice,
} from '@/features/writingPractice/writingPracticeSlice';
import type {
  DragDropExercise,
  Exercise,
  ExerciseType,
  FillChartExercise,
  MultipleChoiceExercise,
  WritingPracticeExercise,
} from '@/data/exercise';
import ChangeExerciseTypeDialog from '@/components/ChangeExerciseTypeDialog';
import MultipleChoiceSettingsContext from '@/context/MultipleChoiceSettingsContext';
import useAppDispatch from '@/hooks/useAppDispatch';
import styles from './ExerciseRenderer.module.css';
import commonStyles from '@/styles/common.module.css';
import useAppSelector from '@/hooks/useAppSelector';

type ExerciseRendererProps = {
  data: Exercise;
};

const DragDrop = lazy(() => import('@/components/exercises/DragDrop'));
const FillChart = lazy(() => import('@/components/exercises/FillChart'));
const MultipleChoice = lazy(
  () => import('@/components/exercises/MultipleChoice'),
);
const WritingPractice = lazy(
  () => import('@/components/exercises/WritingPractice'),
);

export default function ExerciseRenderer({ data }: ExerciseRendererProps) {
  const [exerciseType, setExerciseType] = useState(data.types[0]);
  const [showChangeExerciseTypeDialog, setShowChangeExerciseTypeDialog] =
    useState(false);
  const dispatch = useAppDispatch();
  const isDragDropInitialized = useAppSelector(
    (state) => state.dragDrop.initialized,
  );
  const isFillChartInitialized = useAppSelector(
    (state) => state.fillChart.initialized,
  );
  const isMultipleChoiceInitialized = useAppSelector(
    (state) => state.multipleChoice.initialized,
  );
  const isWritingPracticeInitialized = useAppSelector(
    (state) => state.writingPractice.initialized,
  );
  const { settings: multipleChoiceSettings } = useContext(
    MultipleChoiceSettingsContext,
  );

  useEffect(() => {
    if (exerciseType === 'DRAG_DROP') {
      dispatch(
        initializeDragDrop({
          exercise: data as DragDropExercise,
        }),
      );
    } else if (exerciseType === 'FILL_CHART') {
      dispatch(
        initializeFillChart({
          exercise: data as FillChartExercise,
        }),
      );
    } else if (exerciseType === 'MULTIPLE_CHOICE') {
      dispatch(
        initializeMultipleChoice({
          exercise: data as MultipleChoiceExercise,
          questionFeedback: multipleChoiceSettings.feedback,
        }),
      );
    } else if (exerciseType === 'WRITING_PRACTICE') {
      dispatch(
        initializeWritingPractice({
          exercise: data as WritingPracticeExercise,
        }),
      );
    }
  }, [data, dispatch, multipleChoiceSettings.feedback, exerciseType]);

  const canChangeExerciseType = data.types.length > 1;
  const handleExerciseTypeChoose = (value: ExerciseType) => {
    setExerciseType(value);
    setShowChangeExerciseTypeDialog(false);
  };

  let exercise;
  if (exerciseType === 'DRAG_DROP' && isDragDropInitialized) {
    exercise = <DragDrop key={Date.now()} />;
  } else if (exerciseType === 'FILL_CHART' && isFillChartInitialized) {
    exercise = <FillChart key={Date.now()} />;
  } else if (
    exerciseType === 'MULTIPLE_CHOICE' &&
    isMultipleChoiceInitialized
  ) {
    exercise = <MultipleChoice key={Date.now()} />;
  } else if (
    exerciseType === 'WRITING_PRACTICE' &&
    isWritingPracticeInitialized
  ) {
    exercise = <WritingPractice key={Date.now()} />;
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
      {canChangeExerciseType && (
        <>
          <button
            className={`${styles.exerciseTypeButton} ${commonStyles.button}`}
            onClick={() => setShowChangeExerciseTypeDialog(true)}
            type="button"
          >
            <FaArrowsRotate role="presentation" />
            Change Exercise Type
          </button>
          <ChangeExerciseTypeDialog
            isOpen={showChangeExerciseTypeDialog}
            exercise={data}
            onCancel={() => setShowChangeExerciseTypeDialog(false)}
            onExerciseTypeChoose={handleExerciseTypeChoose}
          />
        </>
      )}
    </div>
  );
}
