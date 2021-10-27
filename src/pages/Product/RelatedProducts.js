import React, { useEffect, useState } from 'react';

import Carousel from '../../components/Carousel/Carousel';

import { relatedProducts } from '../../axiosFunctions/productProfile';
import classes from './Product.module.css';

const RelatedProducts = ({ brand }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadAllProducts = () => {
      setLoading(true);
      relatedProducts(brand, page)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    loadAllProducts();
  }, [page, brand]);
  if (products.length < 0) return null;
  return (
    <div className={classes.products}>
      <header>Related Products</header>
      <Carousel loading={loading} products={products} page={page} setPage={setPage} />
    </div>
  );
};

export default RelatedProducts;
