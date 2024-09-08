import {ReactNode} from "react";

import styles from './ModalOverlay.module.css';

export interface Props {
  children: ReactNode;
  onClose?: () => void;
}

export const ModalOverlay = ({children, onClose}: Props) => {
  return (
      <div className={styles.background} onClick={onClose}>
        <div className={styles.wrapper}>
          {children}
        </div>
      </div>
  );
}
