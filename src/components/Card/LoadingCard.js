import React from 'react';
import { Card, Skeleton } from 'antd';
import styles from './ProductCard.module.css';

const loadingCards = (count) => {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(
      <div className={styles.card} key={i} style={{ margin: '0 1rem' }}>
        <Card style={{ width: '250px', height: '250px' }}>
          <Skeleton active></Skeleton>
        </Card>
      </div>
    );
  }
  return cards;
};

const LoadingCard = ({ count }) => {
  return <>{loadingCards(count)}</>;
};

export default LoadingCard;
