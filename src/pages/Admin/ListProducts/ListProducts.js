import React, { useState, useEffect } from 'react';

import AdminProductCard from '../../../components/Card/AdminProductCard';
import { getProductProfilesByCount } from '../../../axiosFunctions/productProfile';
import Sidebar from '../../../components/nav/Sidebar/Sidebar';

import classes from './ListProducts.module.css';

const Products = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProductProfilesByCount(100)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.page}>
      <Sidebar />
      <div className={classes.content}>
        <h2>Products</h2>
        <div className={classes.list}>
          {product.map((p) => (
            <div key={p._id}>
              <AdminProductCard product={p} loadProducts={loadProducts} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
