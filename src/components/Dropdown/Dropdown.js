import React from 'react';
import classes from './Dropdown.module.css';
const Dropdown = (props) => {
  return (
    <div
      className={classes.dropdown}
      style={{ visibility: props.dropdown ? 'visible' : 'hidden', opacity: props.dropdown ? '1' : '0' }}>
      <div className={classes.menu}>
        <div className={classes.item}>{props.children}</div>
      </div>
    </div>
  );
};

export default Dropdown;
