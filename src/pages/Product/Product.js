import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
//components
import Button from './../../components/Elements/Button/Button';
import RatingAndReviews from './RatingAndReviews';
import StarRating from '../../components/StarRating/StarRating';
import RelatedProducts from './RelatedProducts';
//functons
import { getProductProfile } from '../../axiosFunctions/productProfile';
import { useAddToCart } from '../../Hooks/useAddToCart';
//css
import classes from './Product.module.css';
import { Carousel, Tooltip, message } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import Specifications from './Specifications';
import { addToWishlist, removeFromWishlist } from '../../axiosFunctions/user';
import LoadingPage from './../../components/LoadingPage/LoadingPage';

const Product = ({ match }) => {
  const { params } = match;
  const { slug } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const { setAddToCartItem } = useAddToCart();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const loadProductProfile = async () => {
      setLoading(true);
      await getProductProfile(slug)
        .then((res) => {
          setProduct(res.data);
          if (user) {
            user?.wishlist.forEach((item) => {
              if (item === res.data._id) {
                setWishlist(true);
              }
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    loadProductProfile();
  }, [slug, user]);

  const addToCart = () => {
    setAddToCartItem({ item: product, buy: false });
  };

  const proceedToBuy = () => {
    setAddToCartItem({ item: product, buy: true });
  };
  const slider = useRef();
  const selectImage = (j) => {
    slider.current.goTo(j);
  };

  const handleAddToWishlist = () => {
    if (!user?.token) {
      message.error('Log In to add to wishlist');
      return;
    }
    if (wishlist) {
      removeFromWishlist(user?.token, product._id).then((res) => {
        message.success('REMOVED FROM WISHLIST');
        setWishlist(false);
      });
    }
    if (!wishlist) {
      console.log(product._id);
      addToWishlist(user?.token, product._id).then((res) => {
        message.success('ADDED TO WISHLIST');
        setWishlist(res.data.ok);
      });
    }
  };
  if (loading)
    return (
      <div className={classes.product}>
        <LoadingPage />;
      </div>
    );
  if (product === null) return null;
  return (
    <div className={classes.product}>
      <div className={classes.description}>
        <div className={classes.carousel}>
          <Carousel autoplay dots ref={(ref) => (slider.current = ref)}>
            {product.images.map((i) => (
              <img key={i.public_id} alt={product.slug} src={i.url} />
            ))}
          </Carousel>
          <div className={classes.thumnail}>
            {product.images.map((i, j) => (
              <img key={i.public_id} alt={product.slug} src={i.url} onClick={() => selectImage(j)} />
            ))}
          </div>
        </div>
        <div className={classes.profile}>
          <div className={classes.title}>
            <span>{product.title}</span>
            <div onClick={handleAddToWishlist}>
              <Tooltip title={wishlist ? 'Wishlisted' : 'Add To Wishlist'}>
                <HeartTwoTone twoToneColor={wishlist ? '#d62828' : 'grey'} />
              </Tooltip>
            </div>
          </div>
          <div className={classes.stars}>
            {product.ratings?.length > 0 && (
              <span>
                <StarRating ratings={product.ratings} />
                <span>{`${product.ratings.length} ${product.ratings.length > 1 ? 'Ratings' : 'Rating'}`}</span>
              </span>
            )}
            {product.reviews?.length > 0 && (
              <span>{`${product.reviews.length} ${product.reviews.length > 1 ? 'Reviews' : 'Review'}`}</span>
            )}
          </div>
          <div className={classes.price}>
            <h3>
              <b>
                {(product.price * (1 - product.discount / 100)).toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                })}
              </b>
            </h3>
            <s>
              <b>&#8377; {product.price}</b>
            </s>
            <span>
              <b>{product && product.discount}%Off</b>
            </span>
          </div>
          <div className={classes.availability}>
            <span style={{ color: 'green' }}>{product.quantity > 100 ? 'In Stock' : ''}</span>
            <span style={{ color: 'red' }}>
              {product.quantity < 100 && product.quantity > 0 ? `Only few left in stock` : ''}
            </span>
            <span style={{ color: '#c7cfb7' }}>{product.quantity === 0 ? `Out of Stock` : ''}</span>
          </div>
          <div className={classes.buttons}>
            <Button
              style={{
                minWidth: '40%',
                width: 'fit-content',
                height: '2.5rem',
              }}
              disabled={product.quantity === 0 ? true : false}
              click={addToCart}>
              {product.quantity === 0 ? 'Out Of Stock' : 'Add to Cart'}
            </Button>
            {product.quantity > 0 && (
              <Button
                style={{
                  minWidth: '40%',
                  width: 'fit-content',
                  marginLeft: '1rem',
                }}
                disabled={product.quantity === 0 ? true : false}
                click={proceedToBuy}>
                Proceed to Buy
              </Button>
            )}
          </div>
          <Specifications product={product} />
          <RatingAndReviews product={product} ratings={product.ratings} />
        </div>
      </div>
      <div className={classes.related}>
        <RelatedProducts brand={product.brand} />
      </div>
    </div>
  );
};

export default Product;
