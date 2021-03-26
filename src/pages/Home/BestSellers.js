import React, { useEffect, useState } from 'react';

import ProductsCarousel from '../../components/ProductsCarousel/ProductsCarousel';

import { getProfiles } from '../../axiosFunctions/productProfile';
import styles from './Home.module.css';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  const loadAllProducts = async () => {
    setLoading(true);
    await getProfiles('sold', 'desc', page)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  // loading, products, page, setPage, perPage;
  return (
    <div className={styles.productsCarousel}>
      <header>Best Sellers</header>
      <ProductsCarousel loading={loading} products={products} page={page} setPage={setPage} />
    </div>
  );
};

export default BestSellers;
