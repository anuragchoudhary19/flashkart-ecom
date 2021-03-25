import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import laptop from '../../images/laptop.jpeg';
import StarRating from '../StarRating/StarRating';

import { removeProductProfile } from '../../axiosFunctions/productProfile';
import styles from './ProductCard.module.css';
import { message, Popconfirm } from 'antd';

const AdminProductCard = ({ product, loadProducts }) => {
  const { title, images, price, discount } = product;
  const { user } = useSelector((state) => ({ ...state }));

  const deleteHandle = (slug) => {
    removeProductProfile(slug, user.token)
      .then(() => {
        message.success('Deleted Successfully', 2);
        loadProducts();
      })
      .catch(() => {
        message.error('Error in deleting product', 2);
        loadProducts();
      });
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.slug}`}>
        <img src={images && images.length ? images[0].url : laptop} alt='' width='100px' height='150px' />
        <StarRating ratings={product.ratings} style={{ fontSize: '12px', color: 'white' }} />
        <span>{title}</span>
        <span>
          <b>{(price - (discount * price) / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</b>
        </span>
        <div>
          {discount > 0 && (
            <span>
              <s>{price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</s>
            </span>
          )}
          {discount > 0 && <span style={{ marginLeft: '5px', color: 'green', fontWeight: '500' }}>{discount}%</span>}
        </div>
      </Link>
      <Link className={styles.link} to={`/admin/productProfile/update/${product.slug}`}>
        Update
      </Link>
      <Popconfirm
        title='Are you sure to delete this product?'
        onConfirm={() => deleteHandle(product.slug)}
        okText='Yes'
        cancelText='No'>
        <Link className={styles.link} href='#'>
          Delete
        </Link>
      </Popconfirm>
    </div>
  );
};

export default AdminProductCard;
