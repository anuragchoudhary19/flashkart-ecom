import React, { useEffect, useState } from 'react';

import ProductsCarousel from '../../components/ProductsCarousel/ProductsCarousel';

import { getProfiles } from '../../axiosFunctions/productProfile';
import classes from './Home.module.css';

const BestSellers = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  const loadAllProducts = async () => {
    setLoading(true);
    await getProfiles('sold', 'desc', page)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  // loading, products, page, setPage, perPage;
  return (
    <div className={classes.arrivals}>
      <header>Best Sellers</header>
      <ProductsCarousel loading={loading} products={products} page={page} setPage={setPage} perPage={perPage} />
    </div>
  );
};

export default BestSellers;
