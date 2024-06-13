import { useEffect, useRef, type MouseEvent } from 'react';
import './ReviewDialog.css';

type ReviewDialogProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ReviewDialog({ isOpen, onConfirm, onCancel }: ReviewDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const handleConfirmClick = (e: MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
    onConfirm();
  }
  const handleCancel = () => {
    ref.current?.close();
    if (onCancel) {
      onCancel();
    }
  }

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.showModal();
    }
  }, [isOpen]);

  return (
      isOpen &&
      (<dialog className="reviewdialog" ref={ref} onCancel={handleCancel}>
        <div className="reviewdialog__title">Activate Review Mode?</div>
        <div className="reviewdialog__content">
          Are you sure you want to review? Your current progress will be lost.
        </div>
        <form className="reviewdialog__actions">
          <button onClick={handleConfirmClick} className="reviewdialog__button" autoFocus>OK</button>
          <button onClick={handleCancel} formMethod="dialog" className="reviewdialog__button">Close</button>
        </form>
      </dialog>)
  )
}