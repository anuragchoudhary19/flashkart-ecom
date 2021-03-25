import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Login from '../../pages/auth/Login/Login';
import Signup from '../../pages/auth/Signup/Signup';
import ForgotPassword from '../../pages/auth/ForgotPassword/ForgotPassword';

import styles from './AuthModal.module.css';
import { CloseOutlined } from '@ant-design/icons';

function AuthModal() {
  const dispatch = useDispatch();
  let history = useHistory();

  console.log(history);
  const hide = () => {
    dispatch({
      type: 'HIDE_MODAL',
      payload: null,
    });
  };
  const { authModal } = useSelector((state) => ({ ...state }));
  return (
    authModal && (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div className={styles.close} onClick={hide}>
            <CloseOutlined />
          </div>
          <div>{authModal && authModal.showLoginModal && <Login />}</div>
          <div>{authModal && authModal.showSignupModal && <Signup />}</div>
          <div>{authModal && authModal.showPasswordRecoveryModal && <ForgotPassword />}</div>
        </div>
      </div>
    )
  );
}

export default AuthModal;
