import React from 'react';
import classes from './Input.module.css';
const Input = (props) => {
  const style = [];
  style.push(classes.input);
  if (props.error !== '') {
    style.push(classes.danger);
  }
  return (
    <div className={style.join(' ')}>
      <label>{props.label}</label>
      <div>
        <input
          style={props.style}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.change}
          placeholder={props.placeholder}
        />
        {props.button}
      </div>
      <span>{props.error}</span>
    </div>
  );
};

export default Input;
