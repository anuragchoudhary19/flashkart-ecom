import React from 'react';
import UserNav from '../../components/nav/UserNav/UserNav';
import classes from './User.module.css';

function Account() {
  return (
    <div className={classes.Usernav}>
      <div>
        <UserNav />
      </div>
      <h1>User Account</h1>
    </div>
  );
}
export default Account;
