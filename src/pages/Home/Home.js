import React from 'react';
//components
import NewArrivals from './NewArrivals';
import BestSellers from './BestSellers';
//css
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <NewArrivals />
      <BestSellers />
    </div>
  );
};

export default Home;
