import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
import styles from './StarRating.module.css';

const StarRating = ({ ratings }) => {
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    let totalSum = 0;
    ratings.forEach((rating) => {
      totalSum = totalSum + rating.stars;
    });
    setAvgRating(totalSum / ratings.length);
  }, [ratings]);
  return (
    <div className={styles.star}>
      {avgRating > 0 ? (
        <div>
          <span>{avgRating.toFixed(1)}</span>
          <Rate count={1} value={avgRating} disabled style={{ fontSize: '1rem' }} />
        </div>
      ) : (
        <div>
          <b>No Rating </b>
        </div>
      )}
    </div>
  );
};

export default StarRating;
