import { type MouseEvent } from 'react';
import Dialog from '@/components/Dialog';
import DialogActions from '@/components/Dialog/Actions';
import DialogContent from '@/components/Dialog/Content';
import DialogHeader from '@/components/Dialog/Header';
import commonStyles from '@/styles/common.module.css';

type ReviewDialogProps = {
  isOpen: boolean;
  onCancel?: () => void;
  onConfirm: () => void;
};

export default function ReviewDialog({
  isOpen,
  onConfirm,
  onCancel,
}: ReviewDialogProps) {
  const handleConfirmClick = (e: MouseEvent) => {
    e.preventDefault();
    onConfirm();
  };

  const handleClose = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    isOpen && (
      <Dialog isOpen={isOpen}>
        <DialogHeader>Activate Review Mode?</DialogHeader>
        <DialogContent>
          <p>
            Are you sure you want to review? Your current progress will be lost.
          </p>
        </DialogContent>
        <DialogActions onClose={handleClose}>
          <button
            onClick={handleConfirmClick}
            className={commonStyles.button}
            type="button"
          >
            OK
          </button>
        </DialogActions>
      </Dialog>
    )
  );
}
