import React from 'react';
import classes from './Admin.module.css';
import Sidebar from './../../components/nav/Sidebar/Sidebar';
const Dashboard = () => {
  return (
    <div className={classes.Admin}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.card}>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
