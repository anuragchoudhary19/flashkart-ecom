import React, { useState, useEffect } from 'react';
import classes from './Input.module.css';

const Input = ({ type, name, value, change, placeholder, error, ...rest }) => {
  const [styles, setStyles] = useState([]);
  useEffect(() => {
    if (error && error.length) {
      setStyles([classes.input, classes.danger]);
    } else {
      setStyles([classes.input]);
    }
  }, [error]);

  return (
    <input
      className={styles.join(' ')}
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
