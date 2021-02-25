import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Loading.module.css';
import Backdrop from './../Backdrop/Backdrop';
function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 10000);
    count === 0 && history.push('/');
    //cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <Backdrop>
      <div className={classes.loader}></div>
    </Backdrop>
  );
}

export default LoadingToRedirect;
