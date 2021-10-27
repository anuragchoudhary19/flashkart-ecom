import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
import styles from './StarRating.module.css';

const StarRating = ({ ratings }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    let totalSum = 0;
    ratings.forEach((rating) => {
      totalSum = totalSum + rating.stars;
    });
    setRating(totalSum / ratings.length);
  }, [ratings]);
  return (
    <div className={styles.star}>
      {rating > 0 && (
        <>
          <span style={{ marginRight: '4px' }}>{rating.toFixed(1)}</span>
          <Rate count={1} value={rating} disabled style={{ fontSize: '0.8rem' }} />
        </>
      )}
    </div>
  );
};

export default StarRating;
