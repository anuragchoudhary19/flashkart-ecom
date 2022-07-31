import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import classes from './Button.module.css';

const Button = (props) => {
  const { click, style, type, loading, children } = props;
  const [styles, setStyles] = useState([]);
  useEffect(() => {
    if (loading) {
      setStyles([...styles, classes.disabled]);
    } else {
      setStyles([classes.button]);
    }
  }, [loading, styles]);

  return (
    <div className={styles.join(' ')}>
      <button onClick={click} style={style} type={type} disabled={loading}>
        {loading ? <LoadingOutlined /> : children}
      </button>
    </div>
  );
};

export default Button;
