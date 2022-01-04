import React from 'react';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Login from './Login/Login';
import SignUp from './Signup/Signup';

function AuthModal({ open, setOpen }) {
  const getModal = () => {
    switch (open) {
      case 'login':
        return <Login setOpen={setOpen} />;
      case 'signup':
        return <SignUp setOpen={setOpen} />;
      case 'passwordRecovery':
        return <ForgotPassword setOpen={setOpen} />;
      default:
        return null;
    }
  };
  return <>{getModal()}</>;
}

export default AuthModal;
