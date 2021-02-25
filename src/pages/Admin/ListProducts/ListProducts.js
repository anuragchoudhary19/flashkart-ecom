import React, { useState, useEffect } from 'react';
import classes from './ListProducts.module.css';
import ProductCard from '../../../components/Card/ProductCard';
import { getProductProfilesByCount, removeProductProfile } from '../../../axiosFunctions/productProfile';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/nav/Sidebar/Sidebar';

const Products = () => {
  const [product, setProduct] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
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
  const removeItem = (slug) => {
    let ans = window.confirm('Delete?');
    if (ans) {
      // console.log('Delete', slug);
      removeProductProfile(slug, user.idToken)
        .then(() => loadProducts())
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className={classes.products}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.workspace}>
        <div>
          <h1>Products</h1>
        </div>
        {JSON.stringify(product)}
        <div className={classes.list}>
          {product.map((p) => (
            <div key={p._id}>
              <ProductCard products={p} removeItem={removeItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
