import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Elements/Button/Button';
import { addToCartHandle } from '../../functions/cart';
import { removeFromWishlist } from '../../axiosFunctions/user';
import { getWishlist } from '../../axiosFunctions/user';
import { message } from 'antd';
import styles from './Wishlist.module.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    loadWishlist();
    return loadWishlist;
  }, []);

  const loadWishlist = () => {
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });
  };
  const removeHandle = (id) => {
    removeFromWishlist(user.token, id).then((res) => {
      loadWishlist();
    });
  };
  const addToCart = (item) => {
    addToCartHandle(item, dispatch, user).then((res) => {
      removeHandle(item._id);
    });
  };
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <header>My Wishlist</header>
        {wishlist?.map((item, i) => (
          <div className={styles.tableRow} key={i}>
            <div className={styles.product}>
              <div>
                <Link to={`/product/${item.slug}`}>
                  <img alt='img' src={item.images[0].url} width='80px' height='120px' />
                </Link>
              </div>
              <div>
                <b>{item.title}</b>
                <b>
                  {(item.price * (1 - item.discount / 100)).toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  })}
                </b>
                <span>
                  <s>{item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</s>
                  <b style={{ marginLeft: '5px', color: 'green' }}>
                    {item.discount}
                    %off
                  </b>
                </span>
              </div>
              <div className={styles.controls}>
                <Button click={() => addToCart(item)}>Add To Cart</Button>
                <Button click={() => removeHandle(item._id)}>Remove</Button>
              </div>
            </div>
          </div>
        ))}
        {wishlist.length === 0 ? <div className={styles.empty}>Wishlist is empty</div> : null}
      </div>
      {/* <pre>{JSON.stringify(wishlist, null, 4)}</pre> */}
    </div>
  );
};

export default Wishlist;
