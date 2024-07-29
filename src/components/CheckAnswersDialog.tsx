import { type MouseEvent, type ReactNode } from 'react';
import Dialog from '@/components/Dialog';
import DialogActions from '@/components/Dialog/Actions';
import DialogContent from '@/components/Dialog/Content';
import DialogHeader from '@/components/Dialog/Header';
import commonStyles from '@/styles/common.module.css';

type CheckAnswersDialogProps = {
  content: ReactNode;
  isOpen: boolean;
  onCancel?: () => void;
  onConfirm: () => void;
};

export default function CheckAnswersDialog({
  content,
  isOpen,
  onConfirm,
  onCancel,
}: CheckAnswersDialogProps) {
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
      <DialogHeader>Check Answers?</DialogHeader>
      <DialogContent>{content}</DialogContent>
      <DialogActions onClose={handleClose}>
        <button
          onClick={handleConfirmClick}
          className={commonStyles.button}
          type="button"
        >
          Yes, check my answers!
        </button>
      </DialogActions>
    </Dialog>
  );
}
