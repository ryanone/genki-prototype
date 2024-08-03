import { useState, type ChangeEvent, type MouseEvent } from 'react';
import Dialog from '@/components/Dialog';
import DialogActions from '@/components/Dialog/Actions';
import DialogContent from '@/components/Dialog/Content';
import DialogHeader from '@/components/Dialog/Header';
import type { Exercise, ExerciseType } from '@/data/exercise';
import styles from './ChangeExerciseTypeDialog.module.css';
import commonStyles from '@/styles/common.module.css';

type ChangeExerciseTypeDialogProps = {
  exercise: Exercise;
  isOpen: boolean;
  onCancel?: () => void;
  onExerciseTypeChoose: (type: ExerciseType) => void;
};

const ExerciseTypeDescription: Record<ExerciseType, string> = {
  DRAG_DROP: 'Drag and Drop',
  FILL_CHART: 'Fill in the Chart',
  MULTIPLE_CHOICE: 'Multiple Choice',
  WRITING_PRACTICE: 'Writing Practice',
};

export default function ChangeExerciseTypeDialog({
  isOpen,
  exercise,
  onExerciseTypeChoose,
  onCancel,
}: ChangeExerciseTypeDialogProps) {
  const [exerciseType, setExerciseType] = useState<ExerciseType | ''>('');
  const handleConfirmClick = (e: MouseEvent) => {
    e.preventDefault();
    if (exerciseType !== '') {
      onExerciseTypeChoose(exerciseType);
    }
  };
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setExerciseType(e.target.value as ExerciseType);
    } else {
      setExerciseType('');
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleCancel} role="alertdialog">
      <DialogHeader>Change Exercise Type</DialogHeader>
      <DialogContent>
        <p>
          Please select the type of exercise you would like to do, then select
          &apos;Begin&apos; to start studying.
        </p>
        <div className={styles.heading}>Current Exercise</div>
        <div className={styles.title}>{exercise.title}</div>
        <label className={styles.label}>
          Exercise Type
          <select
            className={commonStyles.select}
            onChange={handleSelectChange}
            value={exerciseType}
          >
            <option value="">Choose a type</option>
            {exercise.types.map((key) => (
              <option key={key} value={key}>
                {ExerciseTypeDescription[key]}
              </option>
            ))}
          </select>
        </label>
      </DialogContent>
      <DialogActions onClose={handleCancel}>
        <button
          onClick={handleConfirmClick}
          className={commonStyles.button}
          type="button"
        >
          Begin
        </button>
      </DialogActions>
    </Dialog>
  );
}
