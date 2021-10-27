import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { getProfiles } from '../../axiosFunctions/productProfile';
import styles from './Home.module.css';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getProfiles('createdAt', 'desc', page)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [page]);

  return (
    <div className={styles.carousel}>
      <header>New Arrivals</header>
      <Carousel loading={loading} products={products} page={page} setPage={setPage} />
    </div>
  );
};

export default NewArrivals;
