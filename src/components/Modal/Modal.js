import React from 'react';
import ReactDom from 'react-dom';
import Auth from '../../pages/auth/Auth';
import styles from './Modal.module.css';

const Modal = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  return ReactDom.createPortal(
    <div className={styles.modal}>
      <Auth isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>,
    document.getElementById('modal')
  );
};
export default Modal;
