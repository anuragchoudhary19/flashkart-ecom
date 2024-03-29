import React, { useEffect, useState } from 'react';

import ProductsCarousel from '../../components/ProductsCarousel/ProductsCarousel';

import { relatedProducts } from '../../axiosFunctions/productProfile';
import classes from './Product.module.css';

const RelatedProducts = ({ brand }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
    return loadAllProducts;
  }, [page]);

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

  return (
    products.length && (
      <div className={classes.products}>
        <header>Related Products</header>
        <ProductsCarousel loading={loading} products={products} page={page} setPage={setPage} />
      </div>
    )
  );
};

export default RelatedProducts;
