import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect, PropsWithChildren } from 'react';
import Button from '../Button/Button';
import './Dialog.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

const Dialog = ({ open, onClose, children }: PropsWithChildren<Props>) => {
  let dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const maybeCloseDialog = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      onClick={maybeCloseDialog}
      ref={dialogRef}
      className="details-dialog"
    >
      <div className="details-dialog__content">
        <Button
          variant="text"
          color="black"
          className="dialog-button"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        {children}
      </div>
    </dialog>
  );
};

export default Dialog;
