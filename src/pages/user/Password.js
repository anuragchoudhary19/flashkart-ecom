import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav/UserNav';
import classes from './User.module.css';
import { auth } from '../../firebase';

function Password() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        document.getElementById('passwordUpdateMessage').innerHTML = 'Password Updated Successfully';
        document.getElementById('passwordUpdateMessage').style.color = 'green';
        setPassword('');
      })
      .catch(() => {
        setLoading(false);
        document.getElementById('passwordUpdateMessage').innerHTML = 'There was an error';
        document.getElementById('passwordUpdateMessage').style.color = 'red';
        setPassword('');
      });
  };
  return (
    <div className={classes.Usernav}>
      <div>
        <UserNav />
      </div>
      <div>
        <h1>Update Password</h1>
        <span id='passwordUpdateMessage'></span>
        <form className={classes.updatePassword} onSubmit={submitHandler}>
          <input
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button type='submit' disabled={loading || !password || password.length < 6}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Password;
