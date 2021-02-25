import React, { useEffect, useState } from 'react';
//functions
import { getProfiles } from '../../axiosFunctions/productProfile';
import styles from './Home.module.css';

import NewArrivals from './NewArrivals';
import BestSellers from './BestSellers';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
    return () => loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    await getProfiles('createdAt', 'desc', 3)
      .then((result) => {
        setProducts(result.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    products && (
      <div className={styles.home}>
        <NewArrivals />
        <BestSellers />
      </div>
    )
  );
};

export default Home;
