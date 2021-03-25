import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
import styles from './StarRating.module.css';
const StarRating = ({ ratings, style }) => {
  const [avgRating, setAvgRating] = useState(0);
  useEffect(() => {
    let totalSum = 0;
    ratings.forEach((ele) => {
      totalSum = totalSum + ele.stars;
    });
    setAvgRating(totalSum / ratings.length);
  }, []);
  return (
    <div className={styles.star}>
      {avgRating > 0 ? (
        <div>
          <div>
            <div style={{ marginTop: '2px' }}>{avgRating.toFixed(1)}</div>
            <Rate count={1} value={avgRating} disabled style={style} />
          </div>          
        </div>
      ) : (
        <div>No rating yet</div>
      )}
    </div>
  );
};

export default StarRating;
