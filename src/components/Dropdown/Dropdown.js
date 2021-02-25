import React from 'react';
import classes from './Dropdown.module.css';
const Dropdown = (props) => {
  return (
    <div className={classes.dropdown}>
      <span className={classes.arrow}></span>
      <div className={classes.menu}>{props.children}</div>
    </div>
  );
};

export default Dropdown;
