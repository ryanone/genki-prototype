import { type MouseEvent } from 'react';
import Dialog from '@/components/Dialog';
import DialogActions from '@/components/Dialog/Actions';
import DialogContent from '@/components/Dialog/Content';
import DialogHeader from '@/components/Dialog/Header';
import * as commonStyles from '@/styles/common.css';

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
    <Dialog isOpen={isOpen} onClose={handleClose}>
      <DialogHeader>Activate Review Mode?</DialogHeader>
      <DialogContent>
        <p>
          Are you sure you want to review? Your current progress will be lost.
        </p>
      </DialogContent>
      <DialogActions onClose={handleClose}>
        <button
          onClick={handleConfirmClick}
          className={commonStyles.primaryButtonClass}
          type="button"
        >
          OK
        </button>
      </DialogActions>
    </Dialog>
  );
}
