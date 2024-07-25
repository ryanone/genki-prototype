import { useState, type ChangeEvent, type MouseEvent } from 'react';
import Dialog from '@/components/Dialog';
import DialogActions from '@/components/Dialog/Actions';
import DialogContent from '@/components/Dialog/Content';
import DialogHeader from '@/components/Dialog/Header';
import type { Exercise, RenderMode } from '@/data/exercise';
import styles from './ChangeExerciseTypeDialog.module.css';
import commonStyles from '@/styles/common.module.css';

type ChangeExerciseTypeDialogProps = {
  exercise: Exercise;
  isOpen: boolean;
  onCancel?: () => void;
  onRenderModeChoose: (renderMode: RenderMode) => void;
};

const RenderModeDescription: Record<RenderMode, string> = {
  DRAG_DROP: 'Drag and Drop',
  MULTIPLE_CHOICE: 'Multiple Choice',
  WRITING_PRACTICE: 'Writing Practice',
};

export default function ChangeExerciseTypeDialog({
  isOpen,
  exercise,
  onRenderModeChoose,
  onCancel,
}: ChangeExerciseTypeDialogProps) {
  const [renderMode, setRenderMode] = useState<RenderMode | ''>('');
  const handleConfirmClick = (e: MouseEvent) => {
    e.preventDefault();
    if (renderMode !== '') {
      onRenderModeChoose(renderMode);
    }
  };
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setRenderMode(e.target.value as RenderMode);
    } else {
      setRenderMode('');
    }
  };

  return (
    isOpen && (
      <Dialog isOpen={isOpen} onClose={handleCancel}>
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
              value={renderMode}
            >
              <option value="">Choose a type</option>
              {exercise.supportedRenderModes.map((key) => (
                <option key={key} value={key}>
                  {RenderModeDescription[key]}
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
    )
  );
}
