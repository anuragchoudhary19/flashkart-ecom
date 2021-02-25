import React from 'react';
import classes from './TextArea.module.css';

const TextArea = (props) => {
  const style = [];
  style.push(classes.textarea);
  if (props.error !== '') {
    style.push(classes.danger);
  }
  return (
    <div className={style.join(' ')}>
      <label>{props.label}</label>
      <div>
        <textarea
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

export default TextArea;
