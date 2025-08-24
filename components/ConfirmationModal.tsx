import React, { ReactNode } from 'react';
import Modal from './Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-dark-text">{title}</h2>
        <p className="text-dark-secondary mb-8">{children}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 font-bold rounded-lg bg-dark-border/50 hover:bg-dark-border text-dark-text transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
