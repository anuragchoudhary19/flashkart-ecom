import React from 'react';
import { Card, Skeleton } from 'antd';
import styles from './ProductCard.module.css';

const loadingCards = (count) => {
  const cardsArray = [];
  for (let i = 0; i < count; i++) {
    cardsArray.push(
      <div className={styles.loadingCard} key={i}>
        <Card style={{ width: '250px', height: '340px' }}>
          <Skeleton active></Skeleton>
        </Card>
      </div>
    );
  }
  return cardsArray;
};

const LoadingCard = ({ count }) => {
  return <>{loadingCards(count)}</>;
};

export default LoadingCard;
