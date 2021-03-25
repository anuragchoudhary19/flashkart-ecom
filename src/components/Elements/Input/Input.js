import React from 'react';
import classes from './Input.module.css';

const Input = ({ type, name, value, change, placeholder, error, ...rest }) => {
  const style = [];
  style.push(classes.input);
  if (error && error.length) {
    style.push(classes.danger);
  }
  return (
    <input
      className={style.join(' ')}
      type={type}
      name={name}
      value={value}
      onChange={change}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
