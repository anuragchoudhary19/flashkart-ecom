import React from 'react';
import ReactDom from 'react-dom';
import AuthModal from '../AuthModal';
import styles from './Modal.module.css';

const Modal = ({ open, setOpen }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <div className={styles.modal}>
      <AuthModal open={open} setOpen={setOpen} />
    </div>,
    document.getElementById('modal')
  );
};
export default Modal;
