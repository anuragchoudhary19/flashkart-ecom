import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import classes from './Button.module.css';

const Button = (props) => {
  const { click, style, type, disabled, loading, children } = props;
  const [styles, setStyles] = useState([]);
  useEffect(() => {
    if (loading) {
      setStyles([classes.button, classes.disabled]);
    } else {
      setStyles([classes.button]);
    }
  }, [loading]);

  return (
    <div className={styles.join(' ')}>
      <button onClick={click} style={style} type={type} disabled={loading || disabled}>
        {loading ? <LoadingOutlined /> : children}
      </button>
    </div>
  );
};

export default Button;
