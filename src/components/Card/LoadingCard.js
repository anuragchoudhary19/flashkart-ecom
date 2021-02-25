import React from 'react';
import { Card, Skeleton } from 'antd';

const LoadingCard = ({ count }) => {
  const loadingCards = () => {
    const cardsArray = [];
    for (let i = 0; i < count; i++) {
      cardsArray.push(
        <Card key={i} style={{ width: 300, marginRight: '50px' }}>
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return cardsArray;
  };

  return <>{loadingCards()}</>;
};

export default LoadingCard;
