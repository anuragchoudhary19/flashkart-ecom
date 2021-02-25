import React from 'react';

const InputSelect = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <select name={props.name} value={props.value} onChange={props.change}>
        {props.children}
      </select>
    </div>
  );
};

export default InputSelect;
