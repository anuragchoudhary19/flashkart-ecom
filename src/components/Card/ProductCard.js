import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.jpeg';
import StarRating from '../StarRating/StarRating';
import Button from '../Elements/Button/Button';

import { unsubscribe } from '../../functions/user';
import { addToCartHandle } from '../../functions/cart';
import { addToWishlist, removeFromWishlist } from '../../axiosFunctions/user';

import styles from './ProductCard.module.css';
import { Tooltip } from 'antd';
import { message } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';

const ProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const { title, images, price, discount } = product;
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('wishlist useeffect');
    if (user && user.wishlist) {
      setWishlisted(user.wishlist.find((ele) => ele === product._id));
    }
  }, [user]);

  const addToCart = (product) => {
    addToCartHandle(product, dispatch, user);
  };
  const wishlistHandle = () => {
    if (!user) {
      message.error('Login to add to wishlist');
      return;
    }
    if (wishlisted) {
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
      <div onClick={wishlistHandle} className={styles.heart}>
        <Tooltip title={wishlisted ? 'Added To Wishlist' : 'Add To Wishlist'}>
          <HeartTwoTone twoToneColor={wishlisted ? '#d62828' : 'grey'} />
        </Tooltip>
      </div>
      <div>
        <Link to={`/product/${product.slug}`}>
          <img src={images && images.length ? images[0].url : laptop} alt='' width='100px' height='150px' />
          <StarRating ratings={product.ratings} style={{ fontSize: '12px', color: '#ffb703' }} />
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
        <Button click={() => addToCart(product)}>Add To Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
