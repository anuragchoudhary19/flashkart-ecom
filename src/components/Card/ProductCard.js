import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import laptop from '../../images/laptop.jpeg';
import StarRating from '../StarRating/StarRating';
import Button from '../Elements/Button/Button';

import { unsubscribe } from '../../functions/user';
import { addToCartHandle } from '../../functions/cart';
import { addToWishlist, removeFromWishlist } from '../../axiosFunctions/user';

import { Tooltip, message } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const [wishlist, setWishlist] = useState(false);
  const { title, images, price, discount, _id, ratings } = product;
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.wishlist) {
      setWishlist(user.wishlist.find((ele) => ele === _id));
    }
  }, [user]);

  const addToCart = () => {
    addToCartHandle(product, dispatch, user);
  };
  const wishlistHandle = () => {
    if (!user) {
      message.error('Login to add to wishlist');
      return;
    }
    if (wishlist) {
      handleRemoveFromWishlist();
    } else {
      handleAddToWishlist();
    }
  };
  const handleAddToWishlist = () => {
    addToWishlist(user.token, product._id).then((res) => {
      message.success('Successfully Added To Wishlist');
      unsubscribe(dispatch);
    });
  };
  const handleRemoveFromWishlist = () => {
    removeFromWishlist(user.token, product._id).then((res) => {
      message.success('Successfully Removed From Wishlist');
      unsubscribe(dispatch);
    });
  };

  return (
    <div className={styles.card}>
      <div onClick={wishlistHandle} className={styles.wishlist}>
        <Tooltip title={wishlist ? 'Wishlisted' : 'Add To Wishlist'}>
          <HeartTwoTone twoToneColor={wishlist ? '#d62828' : 'grey'} />
        </Tooltip>
      </div>
      <div>
        <Link to={`/product/${product.slug}`}>
          <img src={images?.length ? images[0].url : laptop} alt={product.name} width='100px' height='180px' />
          <StarRating ratings={ratings} />
          <span>
            <b>{title}</b>
          </span>
          <span style={{ fontSize: '1.3rem' }}>
            <b>{(price - (discount * price) / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</b>
          </span>
          <div>
            {discount > 0 && (
              <>
                <span>
                  <s>{price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</s>
                </span>
                <span style={{ marginLeft: '5px', color: 'green', fontWeight: 'bold' }}>{discount}%Off</span>
              </>
            )}
          </div>
        </Link>
        <Button click={addToCart}>Add To Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
