import React, { useEffect, useState } from 'react';
import ProductsCarousel from '../../components/ProductsCarousel/ProductsCarousel';
import { getProfiles } from '../../axiosFunctions/productProfile';
import styles from './Home.module.css';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  const loadAllProducts = () => {
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
  };

  return (
    <div className={styles.productsCarousel}>
      <header>New Arrivals</header>
      <ProductsCarousel loading={loading} products={products} page={page} setPage={setPage} />
    </div>
  );
};

export default NewArrivals;
