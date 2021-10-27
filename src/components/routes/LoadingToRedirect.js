import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import classes from './Loading.module.css';

function LoadingToRedirect({ isAuthenticated }) {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && history.push('/');
    //cleanup
    return () => clearInterval(interval);
  }, [count, history]);

  return <div className={classes.loading}>L{<LoadingOutlined />}ading...</div>;
}

export default LoadingToRedirect;
