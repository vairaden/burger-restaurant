import {createPortal} from "react-dom";
import {ModalOverlay} from "../ModalOverlay";
import {ReactNode, useEffect} from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal") as HTMLElement;

export interface Props {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export const Modal = ({children, open, onClose}: Props) => {

  useEffect(() => {
    document.addEventListener("keydown", onClose);

    return () => {
      document.removeEventListener("keydown", onClose);
    }
  }, []);

  if (!open) {
    return null;
  }

  return (
      createPortal((
          <ModalOverlay onClose={onClose}>
            <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={onClose}>
                <CloseIcon type="primary"/>
              </button>
              {children}
            </div>
          </ModalOverlay>
      ), modalRoot)
  );
}
