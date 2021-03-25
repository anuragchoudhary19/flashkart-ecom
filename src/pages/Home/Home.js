import React from 'react';
import { useSelector } from 'react-redux';
//components
import NewArrivals from './NewArrivals';
import BestSellers from './BestSellers';
//css
import styles from './Home.module.css';

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className={styles.home}>
      <NewArrivals />
      <BestSellers />
    </div>
  );
};

export default Home;
