import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './LoadingPage.module.css';
const LoadingPage = () => {
  return (
    <div className={styles.page}>
      <LoadingOutlined />
      Loading...
    </div>
  );
};

export default LoadingPage;
