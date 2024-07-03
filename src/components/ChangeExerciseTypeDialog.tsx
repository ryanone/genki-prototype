import { type ChangeEvent, useEffect, useRef, useState, type MouseEvent } from 'react';
import type { Exercise, RenderMode } from '@/data/exercise';
import styles from './ChangeExerciseTypeDialog.module.css';

type ChangeExerciseTypeDialogProps = {
  isOpen: boolean;
  exercise: Exercise;
  onRenderModeChoose: (renderMode: RenderMode) => void;
  onCancel?: () => void;
}

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

export default function ChangeExerciseTypeDialog({ isOpen, exercise, onRenderModeChoose, onCancel }: ChangeExerciseTypeDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [renderMode, setRenderMode] = useState<RenderMode|''>('');
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
  }

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.showModal();
    }
  }, [isOpen]);

  return (
    isOpen &&
    (
      <dialog className={styles.dialog} ref={ref} onCancel={handleCancel}>
        <div className={styles.title}>Change Exercise Type</div>
        <form className={styles.form}>
          <div className={styles.content}>
            <p>Please select the type of exercise you would like to do, then click 'Begin' to start studying.</p>
            <div className={styles.heading}>Current Exercise</div>
            <div className={styles.title}>{exercise.title}</div>
            <label htmlFor="select-exercise-type" className={styles.label}>
              Exercise Type
              <select className="select" id="select-exercise-type" onChange={handleSelectChange} value={renderMode}>
                <option value="">Choose a type</option>
                {
                  (Object.keys(RenderModeDescription) as RenderMode[]).map((key) =>
                    <option key={key} value={key}>{RenderModeDescription[key]}</option>
                  )
                }
              </select>
            </label>
          </div>
          <div className={styles.actions}>
            <button onClick={handleConfirmClick} className={styles.button} autoFocus>Begin</button>
            <button onClick={handleCancel} formMethod="dialog" className={styles.button}>Cancel</button>
          </div>
        </form>
      </dialog>
    )
  )
}

