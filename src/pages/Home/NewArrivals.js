import React, { useEffect, useState } from 'react';

import ProductsCarousel from '../../components/ProductsCarousel/ProductsCarousel';

import { getProfiles } from '../../axiosFunctions/productProfile';
import classes from './Home.module.css';

const NewArrivals = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  const loadAllProducts = async () => {
    setLoading(true);
    await getProfiles('createdAt', 'desc', page)
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

  return (
    <div className={classes.arrivals}>
      <header>Latest Arrivals</header>
      <ProductsCarousel loading={loading} products={products} page={page} setPage={setPage} />
    </div>
  );
};

export default NewArrivals;
