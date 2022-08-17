import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  classNames?: string;
}

const Modal = ({ children, isOpen, onClose, classNames = '' }: ModalProps) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  });

  if (!isOpen) {
    return <></>;
  }

  return createPortal(
    <div
      className="modalWrapper"
      onClick={(e) => {
        if (e.target === document.querySelector('.modalWrapper')) {
          onClose();
        }
      }}
    >
      <div className={`modal ${classNames}`}>{children}</div>
    </div>,
    document.getElementById('__next')!
  );
};

export default Modal;
