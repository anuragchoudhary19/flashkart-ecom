import React, { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import classes from './Button.module.css';

const Button = (props) => {
  const { click, style, width, type, disabled, loading, children } = props;
  const [styles, setStyles] = useState([]);
  useEffect(() => {
    if (loading) {
      setStyles([classes.button, classes.disabled]);
    } else {
      setStyles([classes.button]);
    }
  }, [loading]);

  return (
    <div className={styles.join(' ')} style={{ minWidth: width ? width : null }}>
      <button onClick={click} style={style} type={type} disabled={loading || disabled}>
        {loading ? <Loading /> : children}
      </button>
    </div>
  );
};

export default Button;
