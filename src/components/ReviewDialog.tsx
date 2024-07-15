import { useEffect, useRef, type MouseEvent } from 'react';
import commonStyles from '@/styles/common.module.css';

type ReviewDialogProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
};

export default function ReviewDialog({ isOpen, onConfirm, onCancel }: ReviewDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const handleConfirmClick = (e: MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
    onConfirm();
  };
  const handleCancel = () => {
    ref.current?.close();
    if (onCancel) {
      onCancel();
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
        <div className={commonStyles.dialogHeader}>Activate Review Mode?</div>
        <div className={commonStyles.dialogContent}>
          Are you sure you want to review? Your current progress will be lost.
        </div>
        <form className={commonStyles.dialogActions}>
          <button onClick={handleConfirmClick} className={commonStyles.button} type="button">OK</button>
          <button
            onClick={handleCancel}
            formMethod="dialog"
            className={commonStyles.button}
            type="button"
          >
            Close
          </button>
        </form>
      </dialog>
      )
  );
}
