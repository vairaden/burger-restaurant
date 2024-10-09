import { createPortal } from 'react-dom';
import { ModalOverlay } from '../ModalOverlay';
import { ReactNode, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Modal.module.css';

const modalRoot = document.getElementById('modal') as HTMLElement;

export interface Props {
  children: ReactNode;
  onClose?: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, []);

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
        {onClose && (
          <button className={styles.closeButton} onClick={onClose} data-test-id="modal-close-button">
            <CloseIcon type="primary" />
          </button>
        )}
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};
