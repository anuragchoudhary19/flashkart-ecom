import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './Modal.module.css';

const Modal = () => {
  return (
    <div className={styles.modal}>
      <Switch>
        <Route exact path='*/login' component={() => <h1>Login</h1>} />
        <Route exact path='*/signup' component={() => <h1>Signup</h1>} />
      </Switch>
    </div>
  );
};

export default Modal;
