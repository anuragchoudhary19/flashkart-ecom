import React from 'react';
import ForgotPassword from './ForgotPassword/ForgotPassword';

import Login from './Login/Login';
import SignUp from './Signup/Signup';

function Auth({ isOpen, setIsOpen }) {
  const getModal = () => {
    switch (isOpen) {
      case 'login':
        return <Login setIsOpen={setIsOpen} />;
      case 'signup':
        return <SignUp setIsOpen={setIsOpen} />;
      case 'passwordRecovery':
        return <ForgotPassword setIsOpen={setIsOpen} />;
      default:
        return null;
    }
  };
  return <>{getModal()}</>;
}

export default Auth;
