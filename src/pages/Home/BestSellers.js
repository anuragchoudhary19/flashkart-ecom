import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { getProfiles } from '../../axiosFunctions/productProfile';
import styles from './Home.module.css';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProfiles('sold', 'desc', page)
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
      <Carousel carouselName='Best Sellers' loading={loading} products={products} page={page} setPage={setPage} />
    </div>
  );
};

export default BestSellers;
