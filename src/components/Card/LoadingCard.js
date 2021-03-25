import React from 'react';
import { Card, Skeleton } from 'antd';
import styles from './ProductCard.module.css';
const LoadingCard = ({ count }) => {
  const loadingCards = () => {
    const cardsArray = [];
    for (let i = 0; i < count; i++) {
      cardsArray.push(
        <div className={styles.loadingCard}>
          <Card key={i} style={{ width: '250px', height: '320px' }}>
            <Skeleton active></Skeleton>
          </Card>
        </div>
      );
    }
    return cardsArray;
  };

  return <>{loadingCards()}</>;
};

export default LoadingCard;
