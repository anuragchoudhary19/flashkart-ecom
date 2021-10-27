import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import classes from './Button.module.css';

const Button = (props) => {
  const { click, style, type, disabled, loading, children } = props;
  let btnClass = [classes.btn];
  if (disabled) {
    btnClass.pop();
    btnClass.push(classes.disabled);
  }
  return (
    <button className={btnClass.join(' ')} onClick={click} style={style} type={type} disabled={disabled}>
      {loading ? <LoadingOutlined style={{ margin: '0 0.5rem' }} /> : null}
      {children}
    </button>
  );
};

export default Button;
