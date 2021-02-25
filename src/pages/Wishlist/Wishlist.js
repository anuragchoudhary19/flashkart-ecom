import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWishlist } from '../../axiosFunctions/user';
import { useSelector } from 'react-redux';
import Button from '../../components/Elements/Button/Button';
import { removeFromWishlist } from '../../axiosFunctions/user';
import styles from './Wishlist.module.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadWishlist();
    return loadWishlist;
  }, []);
  const loadWishlist = () => {
    getWishlist(user.idToken).then((res) => {
      setWishlist(res.data.wishlist);
      console.log(JSON.stringify(res.data, null, 4));
    });
  };
  const removeHandle = (id) => {
    removeFromWishlist(user.idToken, id).then((res) => {
      console.log(res.data);
      loadWishlist();
    });
  };
  return (
    <div className={styles.wishlist}>
      <div className={styles.table}>
        <header>My Wishlist</header>
        {wishlist.map((item, i) => (
          <div className={styles.tableRow} key={i}>
            <div className={styles.product}>
              <div>
                <img alt='img' src={item.images[0].url} width='150px' height='fit-content' />
              </div>
              <Link to={`/product/${item.slug}`}>
                <div>
                  <b>{item.title}</b>
                  <b>
                    &#8377;
                    {item.price * (1 - item.discount / 100)}
                  </b>
                  <span>
                    <s>
                      &#8377;
                      {item.price}
                    </s>
                    <b style={{ marginLeft: '5px', color: 'green' }}>
                      {item.discount}
                      %off
                    </b>
                  </span>
                </div>
              </Link>
              <div className={styles.controls}>
                <div style={{ justifyContent: 'flex-end' }}>
                  <Button click={() => removeHandle(item._id)}>Remove</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <pre>{JSON.stringify(wishlist, null, 4)}</pre> */}
    </div>
  );
};

export default Wishlist;
