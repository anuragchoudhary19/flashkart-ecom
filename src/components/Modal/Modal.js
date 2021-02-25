import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
function Modal(props) {
  const dispatch = useDispatch();
  const hide = () => {
    dispatch({
      type: 'HIDE_MODAL',
      payload: false,
    });
  };
  const { authModal } = useSelector((state) => ({ ...state }));
  return (
    // <div className={authModal ? classes.authmodalShow : classes.authmodalShow + ' ' + classes.authmodalHide}>
    //   <Backdrop />
    <div className={authModal ? classes.ModalShow : classes.ModalShow + ' ' + classes.ModalHide}>
      <div className={classes.close} onClick={hide}>
        <CloseOutlined />
      </div>
      <div>{props.children}</div>
    </div>
    // </div>
  );
}

export default Modal;
