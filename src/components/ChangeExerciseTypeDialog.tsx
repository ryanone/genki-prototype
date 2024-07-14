import {
  type ChangeEvent, useEffect, useRef, useState, type MouseEvent,
} from 'react';
import type { Exercise, RenderMode } from '@/data/exercise';
import styles from './ChangeExerciseTypeDialog.module.css';
import commonStyles from '@/styles/common.module.css';

type ChangeExerciseTypeDialogProps = {
  isOpen: boolean;
  exercise: Exercise;
  onRenderModeChoose: (renderMode: RenderMode) => void;
  onCancel?: () => void;
};

/*
Flow

- Ask user if they're sure (I'm sure/Cancel)
- Show current exercise name and dropdown of supported render modes

props
  exercise
  onRenderModeChoose
*/

const RenderModeDescription: Record<RenderMode, string> = {
  DRAG_DROP: 'Drag and Drop',
  MULTIPLE_CHOICE: 'Multiple Choice',
};

export default function ChangeExerciseTypeDialog({
  isOpen, exercise, onRenderModeChoose, onCancel,
}: ChangeExerciseTypeDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [renderMode, setRenderMode] = useState<RenderMode | ''>('');
  const handleConfirmClick = (e: MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
    if (renderMode !== '') {
      onRenderModeChoose(renderMode);
    }
  };
  const handleCancel = () => {
    ref.current?.close();
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

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.showModal();
    }
  }, [isOpen]);

  return (
    isOpen
    && (
      <dialog className={commonStyles.dialog} ref={ref} onCancel={handleCancel}>
        <div className={commonStyles.dialogHeader}>Change Exercise Type</div>
        <form className={styles.form}>
          <div className={commonStyles.dialogContent}>
            <p>Please select the type of exercise you would like to do, then click 'Begin' to start studying.</p>
            <div className={styles.heading}>Current Exercise</div>
            <div className={styles.title}>{exercise.title}</div>
            <label htmlFor="select-exercise-type" className={styles.label}>
              Exercise Type
              <select className={commonStyles.select} id="select-exercise-type" onChange={handleSelectChange} value={renderMode}>
                <option value="">Choose a type</option>
                {
                  (Object.keys(RenderModeDescription) as RenderMode[]).map((key) => <option key={key} value={key}>{RenderModeDescription[key]}</option>)
                }
              </select>
            </label>
          </div>
          <div className={commonStyles.dialogActions}>
            <button onClick={handleConfirmClick} className={commonStyles.button} autoFocus>Begin</button>
            <button onClick={handleCancel} formMethod="dialog" className={commonStyles.button}>Cancel</button>
          </div>
        </form>
      </dialog>
    )
  );
}
