import React from 'react';
import classes from './Button.module.css';
const Button = (props) => {
  let btnClass = [classes.btn];
  if (props.disabled) {
    btnClass.push(classes.btn_disabled);
  }
  return (
    <button
      className={btnClass.join(' ')}
      onClick={props.click ? props.click : null}
      style={props.style}
      type={props.type}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;
